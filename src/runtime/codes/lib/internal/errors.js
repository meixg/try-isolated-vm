class ERR_INVALID_ARG_TYPE extends Error {
    constructor(name, expected, actual) {
        super(`The "${name}" argument must be of type ${expected}. Received type ${typeof actual}`);
    }
}

module.exports = {
    ERR_INVALID_ARG_TYPE
};
