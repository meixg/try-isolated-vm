const nodeSharedCache = require('@baidu/node-shared-cache')

const cache = new nodeSharedCache.Cache('node', 512 << 10)

cache.foo = 'bar'

setTimeout(() => {
    console.log(cache.bar)
}, 3000);