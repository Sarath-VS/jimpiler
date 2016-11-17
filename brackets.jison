%lex

%%
\s+             /* skip whitespace */
[0-9]+          return 'NUMBER'
"+"             return '+'
"*"             return '*'
<<EOF>>         return 'EOF'
.               return 'INVALID'

/lex

/* operator associations and precedence */

%left '+' '-'
%left '*' '/'

%start expressions

%%

expressions
    : E EOF
        { typeof console !== 'undefined' ? console.log($1) : print($1);
          return $1; }
    ;

E
    : E '+' E
        {$$ = `(${$1} ${$2} ${$3})`}
    | E '*' E
        {$$ = `(${$1} ${$2} ${$3})`}
    | NUMBER
        {$$ = require('number-to-words').toWords($1)}
    ;
