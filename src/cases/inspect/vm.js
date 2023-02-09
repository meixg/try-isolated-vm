const { loadAllCodes } = require('../../utils/load-all-codes')
const {createIsolate} = require('../../utils/create-isolate');

(async () => {
    const codes = await loadAllCodes()
    const {context, isolate} = await createIsolate(codes, true)
    setInterval(async () => {
        const res = await context.eval(`render({name: 'world'})`)
        console.log(res)
    }, 1000)
})()