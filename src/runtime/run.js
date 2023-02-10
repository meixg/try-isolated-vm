const { createIsolate } = require('../utils/create-isolate');
const {codes} = require('./loader');

(async () => {
    const {context, isolate} = await createIsolate(codes, true)
    
})();