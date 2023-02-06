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
    }
}
