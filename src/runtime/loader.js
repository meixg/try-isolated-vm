const path = require('path');
const fs = require('fs');

const BUILTIN_MODULE_ROOT = path.resolve(__dirname, '../runtime/codes/lib');

function wrapBuiltinModule(code, path) {
    const id = path.replace(BUILTIN_MODULE_ROOT + '/', '').replace('.js', '');
    const wrappedCode = `__LOADER__.source['${id}'] = new BuiltinModule('${id}', function (exports, require, module) {
    ${code}        
})`;
    return {
        code: wrappedCode,
        filename: path,
        lineOffset: -1
    };
}

const fileOrder = [
    // base
    {path: './codes/base.js', type: 'base'},

    // builtin modules
    {path: './codes/lib/internal/constants.js', type: 'builtinModule'},
    {path: './codes/lib/internal/errors.js', type: 'builtinModule'},
    {path: './codes/lib/internal/validators.js', type: 'builtinModule'},
    {path: './codes/lib/path.js', type: 'builtinModule'},

    // bootstrap
    {path: './codes/bootstrap.js', type: 'base'},

].map(p => ({
    ...p,
    path: path.resolve(__dirname, p.path),
}));

const codes = fileOrder.map(file => {
    const code = fs.readFileSync(file.path, 'utf8');
    if (file.type === 'base') {
        return {
            code,
            filename: file.path
        };
    }

    if (file.type === 'builtinModule') {
        return wrapBuiltinModule(code, file.path);
    }
});

module.exports = {
    fileOrder,
    codes
};
