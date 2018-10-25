const tokenTypes = require('./tokenTypes');
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

    /**
     * Check if we reach the end of text input
     * If not, get the next character and increment the readPosition
     */
    readChar() {
        if (this.readPosition >= this.input.length) {
            this.char = 0;
        } else {
            this.char = this.input[this.readPosition];
        }
        this.position = this.readPosition;
        this.readPosition += 1;
    }

    /**
     * The same as above, only without increment
     * Used to check for next character for cases with operators
     * Like ==, !=, &&, ||, +=, -= etc.
     * @returns {String} Either an empty string representing the end of text or the next character
     */
    peekChar() {
        if (this.readPosition >= this.input.length) {
            return 0;
        } else {
            return this.input[this.readPosition];
        }
    }

    skipWhiteSpace() {
        while(this.char === ' ' ||
        this.char === '\t' ||
        this.char === '\n' ||
        this.char === '\r') {

            this.readChar();

        }
    }

    /**
     * Analyze the current character and create token
     * @returns {Token} currently analyzed token
     */
    nextToken() {
        let token;

        this.skipWhiteSpace();

        let delimiters = {
            '(': new Token(tokenTypes.LPAREN, '('),
            ')': new Token(tokenTypes.RPAREN, ')'),
            '{': new Token(tokenTypes.LBRACE, '{'),
            '}': new Token(tokenTypes.RBRACE, '}'),
            '[': new Token(tokenTypes.LBRACKET, '['),
            ']': new Token(tokenTypes.RBRACKET, ']'),
            ';': new Token(tokenTypes.SEMICOLON, ';'),
            ':': new Token(tokenTypes.COLON, ':'),
            ',': new Token(tokenTypes.COMMA, ','),
            '\\': new Token(tokenTypes.SLASH, '\\'),
            0: new Token(tokenTypes.EOF, ''),
        };

        let compareAndAssignOps = {
            '=': ['ASSIGN', 'EQ'],
            '+': ['PLUS', 'PLUS_ASSIGN'],
            '-': ['MINUS', 'MINUS_ASSIGN'],
            '/': ['BSLASH', 'DIV_ASSIGN'],
            '*': ['ASTERISK', 'MUL_ASSIGN'],
            '%': ['MODULO', 'MODULO_ASSIGN'],
            '>': ['GT', 'GT_OR_EQ'],
            '<': ['LT', 'LT_OR_EQ'],
            '&': ['B_AND', 'B_AND_ASSIGN'],
            '^': ['XOR', 'XOR_ASSIGN'],
            '|': ['B_OR', 'B_OR_ASSIGN'],
            '!': ['BANG', 'NOT_EQ']
        };

        if (this.char in delimiters) {
            token = delimiters[this.char];
        } else if (this.char in compareAndAssignOps) {
            if (this.peekChar() === '=') {
                let char = this.char;
                this.readChar();
                token = new Token(compareAndAssignOps[char][1], `${char}${this.char}`)
            } else {
                token = new Token(compareAndAssignOps[this.char][0], this.char);
            }
        } else {
            if (this.isLetter(this.char)) {
                let value = this.readIdentifier();
                token = new Token(lookUpIdentifier(value), value);
                return token;
            } else if (this.isNumber(this.char)) {
                token = new Token(tokenTypes.INTEGER, this.readNumber());
                return token;
            } else {
                token = new Token(tokenTypes.ILLEGAL, '');
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
        return '0' <= char && char <= '9';
    }
}

module.exports = Lexer;
