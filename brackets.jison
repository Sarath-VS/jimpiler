%lex

%%
\s+             /* skip whitespace */
[0-9]+          return 'NUMBER'
"+"             return '+'
<<EOF>>         return 'EOF'
.               return 'INVALID'

/lex

%%

expressions
    : E EOF
        { typeof console !== 'undefined' ? console.log($1) : print($1);
          return $1; }
    ;

E
    : E '+' NUMBER    {$$ = `(${$1} ${$2} ${$3})`}
    | NUMBER
    ;
