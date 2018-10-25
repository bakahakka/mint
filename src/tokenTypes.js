/*
* Token types
*
* EOF (end-of-file) token is used to indicate that
* there's no more input left for lexical analysis
*/

const tokenTypes = {
    ILLEGAL : 'ILLEGAL',
    EOF : 'EOF',
    /** Operators */
    PLUS: 'PLUS',
    PLUS_ASSIGN: 'PLUS_ASSIGN',
    MINUS: 'MINUS',
    MINUS_ASSIGN: 'MINUS_ASSIGN',
    ASTERISK: 'ASTERISK',
    MUL_ASSIGN: 'MUL_ASSIGN',
    SLASH: 'SLASH',
    DIV_ASSIGN: 'DIV_ASSIGN',
    MODULO: 'MODULO',
    MODULO_ASSIGN: 'MODULO_ASSIGN',
    ASSIGN: 'ASSIGN',
    BANG: 'BANG',
    GT: 'GT',
    LT: 'LT',
    B_AND: 'B_AND',
    B_AND_ASSIGN: 'B_AND_ASSIGN',
    B_OR: 'B_OR',
    B_OR_ASSIGN: 'B_OR_ASSIGN',
    XOR: 'XOR',
    XOR_ASSIGN: 'XOR_ASSIGN',
    EQ: 'EQ',
    NOT_EQ: 'NOT_EQ',
    GT_OR_EQ: 'GT_OR_EQ',
    LT_OR_EQ: 'LT_OR_EQ',
    BSLASH : 'BSLASH',
    /** Identifiers & literals */
    IDENT : 'IDENT',
    INTEGER : 'INTEGER',
    /** Delimiters */
    COMMA : 'COMMA',
    COLON : 'COLON',
    SEMICOLON : 'SEMICOLON',
    LPAREN : 'LPAREN',
    RPAREN : 'RPAREN',
    LBRACKET : 'LBRACKET',
    RBRACKET : 'RBRACKET',
    LBRACE : 'LBRACE',
    RBRACE : 'RBRACE',
    /** Keywords */
    FUNCTION: 'FUNCTION',
    INT: 'INT',
    STR: 'STR',
    RETURN: 'RETURN',
    IF: 'IF',
    ELSE: 'ELSE',
    TRUE: 'TRUE',
    FALSE: 'FALSE',
    AND: 'AND',
    OR: 'OR',
    NOT: 'NOT',
    IN: 'IN'
};

module.exports = tokenTypes;
