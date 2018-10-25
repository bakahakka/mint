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
        switch(this.char) {
            case '+':
                token = new Token(PLUS, this.char);
                break;
            case '-':
                token = new Token(MINUS, this.char);
                break;
            case '=':
                token = new Token(ASSIGN, this.char);
                break;
            case '(':
                token = new Token(LPAREN, this.char);
                break;
            case ')':
                token = new Token(RPAREN, this.char);
                break;
            case '{':
                token = new Token(LBRACE, this.char);
                break;
            case '}':
                token = new Token(RBRACE, this.char);
                break;
            case ';':
                token = new Token(SEMICOLON, this.char);
                break;
            case ',':
                token = new Token(COMMA, this.char);
                break;
            case 0:
                token = new Token(EOF, '');
                break;
            default:
                if (this.isLetter(this.char)) {
                    token = new Token();
                    token.value = this.readIdentifier();
                    token.type = lookUpIdentifier(token.value);
                    return token;
                } else if (this.isNumber(this.char)) {
                    token = new Token();
                    token.value = this.readNumber();
                    token.type = INTEGER;
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
