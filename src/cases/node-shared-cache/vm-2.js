const path = require('path')
const ivm = require('isolated-vm')
const {logger} = require('../../utils/logger')
const { loadAllCodes } = require('../../utils/load-all-codes')
const nodeSharedCache = require('@baidu/node-shared-cache');

(async () => {
    const codes = await loadAllCodes()
    const codeParam = codes.map(code => ({code}))
    const snapshot = new ivm.Isolate.createSnapshot(codeParam)
    const isolate = new ivm.Isolate({snapshot})
    const context = isolate.createContextSync()
    context.global.setSync('global', context.global.derefInto())

    const cache = new nodeSharedCache.Cache('node', 512 << 10)
    const getCache = new ivm.Reference(function (key) {
        return cache[key]
    })
    const setCache = new ivm.Reference(function (key, value) {
        cache[key] = value
    })
    context.global.setSync('getCache', getCache)
    context.global.setSync('setCache', setCache)

    const result = await context.eval(`renderWithCache({name: 'world'})`, {promise: true})
    console.log(result)
    console.log(cache.foo)
})();

