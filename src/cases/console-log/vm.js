const path = require('path')
const ivm = require('isolated-vm');

(async () => {
    const snapshot = new ivm.Isolate.createSnapshot([{code: ''}])
    const isolate = new ivm.Isolate({snapshot})
    const context = isolate.createContextSync()

    context.global.setSync('global', context.global.derefInto())

    const log = new ivm.Reference(function (...args) {
        console.log(...args)
    })
    context.global.setSync('log', log)

    context.evalSync(`log.apply(0, ['123'])`)
})();
