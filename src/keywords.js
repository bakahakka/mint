const { FUNCTION, INT, STR, IDENT } = require('./tokenTypes');

const keywords = {
    'fn': FUNCTION,
    'int': INT,
    'str': STR,
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
