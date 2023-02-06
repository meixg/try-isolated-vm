const globalUtils = {
    logger: {
        warning(msg) {
            if (typeof global === 'object' && global.loggerWarning) {
                global.loggerWarning.apply(0, [msg])
            }
        },
        fatal(msg) {
            if (typeof global === 'object' && global.loggerFatal) {
                global.loggerFatal.apply(0, [msg])
            }
        }
    },
    cache: {
        get(key) {
            if (typeof global === 'object' && global.getCache) {
                return global.getCache.apply(0, [key])
            }

            return undefined
        },
        set(key, value) {
            if (typeof global === 'object' && global.setCache) {
                global.setCache.apply(0, [key, value])
            }
        }
    }
}
