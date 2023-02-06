const nodeSharedCache = require('@baidu/node-shared-cache')

const cache = new nodeSharedCache.Cache("node", 512 << 10)

cache.bar = 'foo'

setTimeout(() => {
    console.log(cache.foo)
}, 3000);