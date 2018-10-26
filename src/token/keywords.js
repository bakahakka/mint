const tokenTypes = require('./tokenTypes');

const keywords = {
    'fn': tokenTypes.FUNCTION,
    'int': tokenTypes.INT,
    'str': tokenTypes.STR,
    'return': tokenTypes.RETURN,
    'if': tokenTypes.IF,
    'else': tokenTypes.ELSE,
    'true': tokenTypes.TRUE,
    'false': tokenTypes.FALSE,
    'and': tokenTypes.AND,
    'or': tokenTypes.OR,
    'not': tokenTypes.NOT,
    'in': tokenTypes.IN
};

const lookUpIdentifier = ident => {
    if (ident in keywords) {
        return keywords[ident];
    }

    return tokenTypes.IDENT;
};

module.exports = lookUpIdentifier;
