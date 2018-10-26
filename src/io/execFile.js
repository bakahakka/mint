const fs = require('fs');
const Lexer = require('../Lexer');

function execFile(path) {
    fs.readFile(`${path}`, 'utf-8', (err, data) => {
       if (err) console.error(err);

       let l = new Lexer(data.split('\n').join(''));

       while (true) {
           let token = l.nextToken();
           console.log(token);

           if (token.type === 'EOF') break;
       }
    });
}

module.exports = execFile;
