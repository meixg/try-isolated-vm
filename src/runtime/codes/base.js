// const globalUtils = {
//     logger: {
//         warning(msg) {
//             if (typeof global === 'object' && global.loggerWarning) {
//                 global.loggerWarning.apply(0, [msg])
//             }
//         },
//         fatal(msg) {
//             if (typeof global === 'object' && global.loggerFatal) {
//                 global.loggerFatal.apply(0, [msg])
//             }
//         }
//     },
//     cache: {
//         get(key) {
//             if (typeof global === 'object' && global.getCache) {
//                 return global.getCache.apply(0, [key])
//             }

//             return undefined
//         },
//         set(key, value) {
//             if (typeof global === 'object' && global.setCache) {
//                 global.setCache.apply(0, [key, value])
//             }
//         }
//     },
//     path: createPathModule()
// };
const process = {};
class BuiltinModule {
    constructor(id, fn) {
        this.id = id;
        this.exports = {};
        this.loaded = false;
        this.fn = fn;
    }
    compile() {
        if (this.loaded) {
            return this.exports;
        }
        this.fn(this.exports, __LOADER__.builtinModuleRequire, this, process);
        this.loaded = true;

        return this.exports;
    }
}
class Module {
    constructor(id, fn) {
        this.id = id;
        this.exports = {};
        this.loaded = false;
        this.fn = fn;
    }
    compile() {}
}

const __LOADER__ = {
    source: {},
    builtinModuleRequire(id) {
        const m = this.source[id];
        if (!m) {
            throw Error(`internal module ${id} not found`);
        }
        return m.compile();
    },
    createRequire(filename) {
        let filepath;

        if (typeof filename === 'string' && !path.isAbsolute(filename)) {
            try {
                filepath = fileURLToPath(filename);
            } catch {
                throw new ERR_INVALID_ARG_VALUE('filename', filename,
                                            createRequireError);
            }
        } else if (typeof filename !== 'string') {
            throw new ERR_INVALID_ARG_VALUE('filename', filename, createRequireError);
        } else {
            filepath = filename;
        }
        return createRequireFromPath(filepath);
    }
};

__LOADER__.source['/xxx/xxx/a'] = new Module('/xxx/xxx/a', function (module, exports, require) {});
__LOADER__.source['/xxx/xxx/b'] = new Module('/xxx/xxxx/b', function (module, exports, require) {});
__LOADER__.source['/xxx/xxx/c'] = new Module('/xxx/xxxx/c', function (module, exports, require) {});
__LOADER__.source['/xxx/xxx/d'] = new Module('/xxx/xxxx/d', function (module, exports, require) {});


