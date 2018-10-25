const { INTEGER,
    PLUS,
    EOF,
    MINUS,
    ASSIGN,
    ILLEGAL,
    LPAREN,
    RPAREN,
    LBRACE,
    RBRACE,
    SEMICOLON,
    COMMA
} = require('./tokenTypes');
const lookUpIdentifier = require('./keywords');
const Token = require('./Token');

/**
 * @param {String} input - User string input
 * @param {Number} position - A current index in input
 * @param {Number} readPosition -- A next index in input
 * @param {char} -- Current character
 */
class Lexer {
    constructor(input) {
        this.input = input;
        this.position = 0;
        this.readPosition = 0;
        this.char = null;

        this.readChar();
    }

    readChar() {
        if (this.readPosition >= this.input.length) {
            this.char = 0;
        } else {
            this.char = this.input[this.readPosition];
        }
        this.position = this.readPosition;
        this.readPosition += 1;
    }

    skipWhiteSpace() {
        while(this.char === ' ' ||
        this.char === '\t' ||
        this.char === '\n' ||
        this.char === '\r') {

            this.readChar();

        }
    }

    nextToken() {
        let token;

        this.skipWhiteSpace();

        let chars = {
            '+': new Token(PLUS, '+'),
            '-': new Token(MINUS, '-'),
            '=': new Token(ASSIGN, '='),
            '(': new Token(LPAREN, '('),
            ')': new Token(RPAREN, ')'),
            '{': new Token(LBRACE, '{'),
            '}': new Token(RBRACE, '}'),
            ';': new Token(SEMICOLON, ';'),
            ',': new Token(COMMA, ','),
            0: new Token(EOF, ''),
        };

        if (this.char in chars) {
            token = chars[this.char];
        } else {
            if (this.isLetter(this.char)) {
                let value = this.readIdentifier();
                token = new Token(lookUpIdentifier(value), value);
                return token;
            } else if (this.isNumber(this.char)) {
                token = new Token(INTEGER, this.readNumber());
                return token;
            } else {
                token = new Token(ILLEGAL, '');
            }
        }

        this.readChar();
        return token;
    }

    readIdentifier() {
        let position = this.position;
        while (this.isLetter(this.char)) {
            this.readChar();
        }

        return this.input.slice(position, this.position);
    }

    isLetter(char) {
        return 'a' <= char && char <= 'z' ||
               'A' <= char && char <= 'Z' ||
               char === '_'
    }

    readNumber() {
        let position = this.position;
        while (this.isNumber(this.char)) {
            this.readChar();
        }
        return this.input.slice(position, this.position);
    }

    isNumber(char) {
        return !isNaN(char);
    }
}

module.exports = Lexer;
