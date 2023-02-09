const path = require('path');
const fs = require('fs');

const fileOrder = [
    // base
    './codes/base.js',

    // builtin modules
    './internal/constants.js',
    './internal/errors.js',
    './internal/validators.js',
    './codes/internal/path.js',

    // bootstrap
    './code/bootstrap.js'

].map(p => path.resolve(__dirname, p));

module.exports = {
    fileOrder
};
