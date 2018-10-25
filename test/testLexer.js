const assert = require('assert');
const Lexer = require('../src/Lexer');
const { INTEGER,
    PLUS,
    EOF,
    ASSIGN,
    IDENT,
    FUNCTION,
    INT,
    STR,
    LPAREN,
    RPAREN,
    LBRACE,
    RBRACE,
    SEMICOLON,
    COMMA,
    RETURN,
} = require('../src/tokenTypes');
const Token = require('../src/Token');

describe('Lexer', () => {
    it('should break up the source code into tokens', () => {
       const input = `int number = 5;
str string;       
int add = fn(int x, int y) {
    return x + y;
};
       `;

       const expectedTokens = [
           new Token(INT, 'int'),
           new Token(IDENT, 'number'),
           new Token(ASSIGN, '='),
           new Token(INTEGER, '5'),
           new Token(SEMICOLON, ';'),
           new Token(STR, 'str'),
           new Token(IDENT, 'string'),
           new Token(SEMICOLON, ';'),
           new Token(INT, 'int'),
           new Token(IDENT, 'add'),
           new Token(ASSIGN, '='),
           new Token(FUNCTION, 'fn'),
           new Token(LPAREN, '('),
           new Token(INT, 'int'),
           new Token(IDENT, 'x'),
           new Token(COMMA, ','),
           new Token(INT, 'int'),
           new Token(IDENT, 'y'),
           new Token(RPAREN, ')'),
           new Token(LBRACE, '{'),
           new Token(RETURN, 'return'),
           new Token(IDENT, 'x'),
           new Token(PLUS, '+'),
           new Token(IDENT, 'y'),
           new Token(SEMICOLON, ';'),
           new Token(RBRACE, '}'),
           new Token(SEMICOLON, ';'),
           new Token(EOF, ''),
       ];

       let lexer = new Lexer(input);

       for (let expected of expectedTokens) {
           let token = lexer.nextToken();
           assert.equal(token.type, expected.type);
           assert.equal(token.value, expected.value);
       }
    });
});
