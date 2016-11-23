%{
    var OpNode = require('../../../lib/OpNode.js');
    var NumNode = require('../../../lib/NumNode.js');
    var shelf = {};
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

%right '='
%left '+' '-'
%left '*' '/'
%left '^'
%right '!'
%right '%'
%left UMINUS
%right VARIABLE
%left ';'

%start expressions

%%

expressions
    : statements EOF
        { //console.log($1);
           return $1; }
    ;

statements
    : statements ';' E
        {$$ = $3 }
    | statements ';'
        { $$ = $1 }
    | E
    ;

E
    : E '+' E
        { $$ = [$1, new OpNode($2), $3] }
    | E '-' E
        { $$ = [$1, new OpNode($2), $3] }
    | E '*' E
        { $$ = [$1, new OpNode($2), $3] }
    | E '/' E
        { $$ = [$1, new OpNode($2), $3] }
    | E '^' E
        { $$ = [$1, new OpNode($2), $3] }
    | E '!'
        { $$ = [$1, $2] }
    | E '%' E
        { $$ = [$1, new OpNode($2), $3]}
    | '(' E ')'
        { $$ = $2 }
    | VARIABLE '=' E
        { shelf[$1] = $3; }
    | UMINUS E
        { $$ = [$1, $2] }
    | NUMBER
        { $$ = new NumNode($1) }
    | VARIABLE
        {if(!shelf[$1]) throw new Error(`Error: 'undefined' variable`);
         $$ = shelf[$1];
        }
    ;
