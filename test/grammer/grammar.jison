%{
    var OpNode = require('../../../lib/OpNode.js');
    var NumNode = require('../../../lib/NumNode.js');
    var VarNode = require('../../../lib/VarNode.js');
    var Expression = require('../../../lib/Expression.js');
    var Shelf = require('../../../lib/Shelf.js');
    var shelf = new Shelf();
%}
%lex

%%
\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
[a-zA-Z_$]+           return 'VARIABLE'
"*"                   return '*'
"/"                   return '/'
"-"                   return '-'
"+"                   return '+'
"="                   return '='
";"                   return ';'
"^"                   return '^'
"!"                   return '!'
"%"                   return '%'
"("                   return '('
")"                   return ')'
"PI"                  return 'PI'
"E"                   return 'E'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */

%left '+' '-'
%left '*' '/'
%left '^'
%right '!'
%right '%'
%left UMINUS
%right VARIABLE
%right '='
%left ';'

%start expressions

%%

expressions
    : statements EOF
        {
            $1.unshift(shelf);
            return $1;
        }
    ;

statements
    : statements ';' statement
        {$$ = $3 }
    | statements ';'
    | statement
    ;

statement
    : assignment
    {
      $$ = [new Expression($1)] ;
    }
    | E
      { $$ = [new Expression($1)] ;}
    ;

assignment
    : VARIABLE '=' E
      {
        shelf.add($1, new VarNode($1,new Expression($3)));
        $$ = shelf.fetch($1);
      }


    ;

E
    : E '+' E
        { $$ = [new OpNode($2), $1, $3] }
    | E '-' E
        { $$ = [new OpNode($2), $1, $3] }
    | E '*' E
        { $$ = [new OpNode($2), $1, $3] }
    | E '/' E
        { $$ = [new OpNode($2), $1, $3] }
    | E '^' E
        { $$ = [new OpNode($2), $1, $3] }
    | E '!'
        { $$ = [$1, $2] }
    | E '%' E
        { $$ = [new OpNode($2), $1, $3]}
    | '(' E ')'
        { $$ = $2 }
    | UMINUS E
        { $$ = [$1, $2] }
    | NUMBER
        { $$ = new NumNode($1) }
    | VARIABLE
        {
          if(!shelf.fetch($1)) throw new Error(`Error: 'undefined' variable`);
          $$ = shelf.fetch($1);
        }
    ;
