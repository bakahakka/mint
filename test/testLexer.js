const assert = require('assert');
const Lexer = require('../src/Lexer');
const tokenTypes = require('../src/tokenTypes');
const Token = require('../src/Token');

describe('Lexer', () => {
    it('should break up the source code into tokens', () => {
       const input = `int number = 5;

str string;
       
int add = fn(int x, int y) {
    return x + y;
};

int sum = add(5, 5);

int sub = fn(int x, int y) {
    return x - y;
};

int result = sub(10, 5);

if sum > result or not true {
   return true
} else {
   return 5 % 2 and 1 in 4 
}

false

int[] array = [1, 2, 3];

1 == false

2 >= 3

4 <= 6

7 != true

!*/\\><&^|:`;

       const expectedTokens = [
           new Token(tokenTypes.INT, 'int'),
           new Token(tokenTypes.IDENT, 'number'),
           new Token(tokenTypes.ASSIGN, '='),
           new Token(tokenTypes.INTEGER, '5'),
           new Token(tokenTypes.SEMICOLON, ';'),
           new Token(tokenTypes.STR, 'str'),
           new Token(tokenTypes.IDENT, 'string'),
           new Token(tokenTypes.SEMICOLON, ';'),
           new Token(tokenTypes.INT, 'int'),
           new Token(tokenTypes.IDENT, 'add'),
           new Token(tokenTypes.ASSIGN, '='),
           new Token(tokenTypes.FUNCTION, 'fn'),
           new Token(tokenTypes.LPAREN, '('),
           new Token(tokenTypes.INT, 'int'),
           new Token(tokenTypes.IDENT, 'x'),
           new Token(tokenTypes.COMMA, ','),
           new Token(tokenTypes.INT, 'int'),
           new Token(tokenTypes.IDENT, 'y'),
           new Token(tokenTypes.RPAREN, ')'),
           new Token(tokenTypes.LBRACE, '{'),
           new Token(tokenTypes.RETURN, 'return'),
           new Token(tokenTypes.IDENT, 'x'),
           new Token(tokenTypes.PLUS, '+'),
           new Token(tokenTypes.IDENT, 'y'),
           new Token(tokenTypes.SEMICOLON, ';'),
           new Token(tokenTypes.RBRACE, '}'),
           new Token(tokenTypes.SEMICOLON, ';'),
           new Token(tokenTypes.INT, 'int'),
           new Token(tokenTypes.IDENT, 'sum'),
           new Token(tokenTypes.ASSIGN, '='),
           new Token(tokenTypes.IDENT, 'add'),
           new Token(tokenTypes.LPAREN, '('),
           new Token(tokenTypes.INTEGER, '5'),
           new Token(tokenTypes.COMMA, ','),
           new Token(tokenTypes.INTEGER, '5'),
           new Token(tokenTypes.RPAREN, ')'),
           new Token(tokenTypes.SEMICOLON, ';'),
           new Token(tokenTypes.INT, 'int'),
           new Token(tokenTypes.IDENT, 'sub'),
           new Token(tokenTypes.ASSIGN, '='),
           new Token(tokenTypes.FUNCTION, 'fn'),
           new Token(tokenTypes.LPAREN, '('),
           new Token(tokenTypes.INT, 'int'),
           new Token(tokenTypes.IDENT, 'x'),
           new Token(tokenTypes.COMMA, ','),
           new Token(tokenTypes.INT, 'int'),
           new Token(tokenTypes.IDENT, 'y'),
           new Token(tokenTypes.RPAREN, ')'),
           new Token(tokenTypes.LBRACE, '{'),
           new Token(tokenTypes.RETURN, 'return'),
           new Token(tokenTypes.IDENT, 'x'),
           new Token(tokenTypes.MINUS, '-'),
           new Token(tokenTypes.IDENT, 'y'),
           new Token(tokenTypes.SEMICOLON, ';'),
           new Token(tokenTypes.RBRACE, '}'),
           new Token(tokenTypes.SEMICOLON, ';'),
           new Token(tokenTypes.INT, 'int'),
           new Token(tokenTypes.IDENT, 'result'),
           new Token(tokenTypes.ASSIGN, '='),
           new Token(tokenTypes.IDENT, 'sub'),
           new Token(tokenTypes.LPAREN, '('),
           new Token(tokenTypes.INTEGER, '10'),
           new Token(tokenTypes.COMMA, ','),
           new Token(tokenTypes.INTEGER, '5'),
           new Token(tokenTypes.RPAREN, ')'),
           new Token(tokenTypes.SEMICOLON, ';'),
           new Token(tokenTypes.IF, 'if'),
           new Token(tokenTypes.IDENT, 'sum'),
           new Token(tokenTypes.GT, '>'),
           new Token(tokenTypes.IDENT, 'result'),
           new Token(tokenTypes.OR, 'or'),
           new Token(tokenTypes.NOT, 'not'),
           new Token(tokenTypes.TRUE, 'true'),
           new Token(tokenTypes.LBRACE, '{'),
           new Token(tokenTypes.RETURN, 'return'),
           new Token(tokenTypes.TRUE, 'true'),
           new Token(tokenTypes.RBRACE, '}'),
           new Token(tokenTypes.ELSE, 'else'),
           new Token(tokenTypes.LBRACE, '{'),
           new Token(tokenTypes.RETURN, 'return'),
           new Token(tokenTypes.INTEGER, '5'),
           new Token(tokenTypes.MODULO, '%'),
           new Token(tokenTypes.INTEGER, '2'),
           new Token(tokenTypes.AND, 'and'),
           new Token(tokenTypes.INTEGER, '1'),
           new Token(tokenTypes.IN, 'in'),
           new Token(tokenTypes.INTEGER, '4'),
           new Token(tokenTypes.RBRACE, '}'),
           new Token(tokenTypes.FALSE, 'false'),
           new Token(tokenTypes.INT, 'int'),
           new Token(tokenTypes.LBRACKET, '['),
           new Token(tokenTypes.RBRACKET, ']'),
           new Token(tokenTypes.IDENT, 'array'),
           new Token(tokenTypes.ASSIGN, '='),
           new Token(tokenTypes.LBRACKET, '['),
           new Token(tokenTypes.INTEGER, '1'),
           new Token(tokenTypes.COMMA, ','),
           new Token(tokenTypes.INTEGER, '2'),
           new Token(tokenTypes.COMMA, ','),
           new Token(tokenTypes.INTEGER, '3'),
           new Token(tokenTypes.RBRACKET, ']'),
           new Token(tokenTypes.SEMICOLON, ';'),
           new Token(tokenTypes.INTEGER, '1'),
           new Token(tokenTypes.EQ, '=='),
           new Token(tokenTypes.FALSE, 'false'),
           new Token(tokenTypes.INTEGER, '2'),
           new Token(tokenTypes.GT_OR_EQ, '>='),
           new Token(tokenTypes.INTEGER, '3'),
           new Token(tokenTypes.INTEGER, '4'),
           new Token(tokenTypes.LT_OR_EQ, '<='),
           new Token(tokenTypes.INTEGER, '6'),
           new Token(tokenTypes.INTEGER, '7'),
           new Token(tokenTypes.NOT_EQ, '!='),
           new Token(tokenTypes.TRUE, 'true'),
           new Token(tokenTypes.BANG, '!'),
           new Token(tokenTypes.ASTERISK, '*'),
           new Token(tokenTypes.BSLASH, '/'),
           new Token(tokenTypes.SLASH, '\\'),
           new Token(tokenTypes.GT, '>'),
           new Token(tokenTypes.LT, '<'),
           new Token(tokenTypes.B_AND, '&'),
           new Token(tokenTypes.XOR, '^'),
           new Token(tokenTypes.B_OR, '|'),
           new Token(tokenTypes.COLON, ':'),
           new Token(tokenTypes.EOF, ''),
       ];

       let lexer = new Lexer(input);

       for (let expected of expectedTokens) {
           let token = lexer.nextToken();
           assert.equal(token.type, expected.type);
           assert.equal(token.value, expected.value);
       }
    });
});
