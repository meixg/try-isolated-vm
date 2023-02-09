const {
    validateString
} = require('internal/validators');
const {
    CHAR_FORWARD_SLASH
} = require('internal/constants');

const posix = {
    /**
     * @param {string} path
     * @returns {boolean}
     */
    isAbsolute(path) {
        validateString(path, 'path');
        return path.length > 0 &&
            path.charCodeAt(0) === CHAR_FORWARD_SLASH;
    }
};

module.exports = posix;