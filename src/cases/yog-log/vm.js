const path = require('path')
const ivm = require('isolated-vm')
const {logger} = require('../../utils/logger')
const { loadAllCodes } = require('../../utils/load-all-codes');

(async () => {
    const codes = await loadAllCodes()
    const codeParam = codes.map(code => ({code}))
    const snapshot = new ivm.Isolate.createSnapshot(codeParam)
    const isolate = new ivm.Isolate({snapshot})
    const context = isolate.createContextSync()

    context.global.setSync('global', context.global.derefInto())

    const loggerWarning = new ivm.Reference(function (...args) {
        logger.warning(...args)
    })
    const loggerFatal = new ivm.Reference(function (...args) {
        logger.fatal(...args)
    })
    context.global.setSync('loggerWarning', loggerWarning)
    context.global.setSync('loggerFatal', loggerFatal)

    const result = context.evalSync(`render({name: 'world'})`)
    console.log(result)
})();
