const { INTEGER, PLUS, EOF } = require('./tokenTypes');
const Token = require('./Token');

/**
 * @param {String} input - User string input
 * @param {Number} position - An index in input
 * @param {null|Token} currentToken - Current token instance
 */
class Lexer {
    constructor(input) {
        this.input = input;
        this.position = 0;
        this.currentToken = null;

        this.error = this.error.bind(this);
        this.getNextToken = this.getNextToken.bind(this);
        this.eat = this.eat.bind(this);
        this.expr = this.expr.bind(this);
    }

    error() {
        throw new Error('Error parsing input');
    }

    getNextToken() {
        if (this.position > this.input.length - 1) {
            return new Token(EOF, null);
        }

        let currentChar = this.input[this.position];

        if (!isNaN(currentChar)) {
            let token = new Token(INTEGER, parseInt(currentChar, 10));
            this.position += 1;
            return token;
        }

        if (currentChar === '+') {
            let token = new Token(PLUS, currentChar);
            this.position += 1;
            return token;
        }

        this.error();
    }

    eat(tokenType) {
        if (this.currentToken.type === tokenType) {
            this.currentToken = this.getNextToken();
        } else {
            this.error();
        }
    }

    expr() {
        this.currentToken = this.getNextToken();

        let left = this.currentToken;
        this.eat(INTEGER);

        let operator = this.currentToken;
        this.eat(PLUS);

        let right = this.currentToken;
        this.eat(INTEGER);

        return left.value + right.value;
    }
}

module.exports = Lexer;
