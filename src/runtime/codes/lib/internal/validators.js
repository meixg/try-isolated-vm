const {
    ERR_INVALID_ARG_TYPE
} = require('internal/errors');

function validateString(value, name) {
  if (typeof value !== 'string')
    throw new ERR_INVALID_ARG_TYPE(name, 'string', value);
}

module.exports = {
    validateString
};
