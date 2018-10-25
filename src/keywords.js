const { FUNCTION, INT, STR, IDENT, RETURN } = require('./tokenTypes');

const keywords = {
    'fn': FUNCTION,
    'int': INT,
    'str': STR,
    'return': RETURN
};

const lookUpIdentifier = ident => {
    for (let kw in keywords) {
        if (ident === kw) {
            return keywords[kw];
        }
    }

    return IDENT;
};

module.exports = lookUpIdentifier;
