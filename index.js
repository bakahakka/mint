const readline = require('readline');
const Lexer = require('./src/Lexer');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Mint shell v0.0.0.1 > ', (answer) => {
   let lexer = new Lexer(answer);
   let result = lexer.expr();
   console.log(`#=> ${result}`);
   rl.close();
});

