const execFile = require('./src/io/execFile');
const repl = require('./src/io/repl');

// Start REPL or read from file
if (process.argv.length > 2) {
    let path = process.argv[2];
    execFile(path);
} else {
    repl(process.stdin, process.stdout);
}

