/**
 * Class representing token
 * @param {String} type - token type
 * @param {any} value - token value
 */
class Token {
    constructor(type, value ) {
        this.type = type;
        this.value = value;

        this.toString = this.toString.bind(this);
    }

    /**
     * String representation of class instance
     * @example
     * // returns 'Token(INTEGER, 3)'
     * token = new Token('INTEGER', 3);
     * token.toString();
     * @returns {String}
     */
    toString() {
        return `Token(${this.type}, ${this.value})`;
    }
}

module.exports = Token;
