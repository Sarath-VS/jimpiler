%{
    var OpNode = require('../../../lib/OpNode.js');
    var NumNode = require('../../../lib/NumNode.js');
%}
%lex

%%
\s+             /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
"*"                   return '*'
"/"                   return '/'
"-"                   return '-'
"+"                   return '+'
"^"                   return '^'
"!"                   return '!'
"%"                   return '%'
"("                   return '('
")"                   return ')'
"PI"                  return 'PI'
"E"                   return 'E'
<<EOF>>         return 'EOF'
.               return 'INVALID'

/lex

/* operator associations and precedence */

%left '+' '-'
%left '*' '/'
%left '^'
%right '!'
%right '%'
%left UMINUS

%start expressions

%%

expressions
    : E EOF
        { //console.log($1);
          return $1; }
    ;

E
    : E '+' E
        {$$ = [$1, new OpNode($2), $3]}
    | E '-' E
        {$$ = [$1, new OpNode($2), $3]}
    | E '*' E
        {$$ = [$1, new OpNode($2), $3]}
    | E '/' E
        {$$ = [$1, new OpNode($2), $3]}
    | E '^' E
        {$$ = [$1, new OpNode($2), $3]}
    | E '!'
        {$$ = [$1, $2]}
    | E '%' E
        {$$ = [$1, new OpNode($2), $3]}
    | UMINUS E
        {$$ = [$1, $2]}
    | NUMBER
        {$$ = new NumNode($1)}
    ;
