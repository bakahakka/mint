const readline = require('readline');
const Lexer = require('../Lexer');
const Token = require('../token/Token');
const tokenTypes = require('../token/tokenTypes');

const initREPL = (stdin, stdout) => {
    const rl = readline.createInterface({
        input: stdin,
        output: stdout,
    });

    console.log('Mint shell\n');

    rl.question('>> ', input => {
        let l = new Lexer(input);

        while (true) {
            let token = l.nextToken();
            console.log(token);

            if (token.type === tokenTypes.EOF) {
                break;
            }
        }
    });
};

module.exports = initREPL;
