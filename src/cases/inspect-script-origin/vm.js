const { loadAllCodes } = require('../../utils/load-all-codes')
const {createIsolate} = require('../../utils/create-isolate');

(async () => {
    const codes = await loadAllCodes()

    const renderCode = codes.find(code => code.filename.endsWith('render.js'))
    renderCode.code = `// 123123
    // 456456
    // 789789
    ${renderCode.code}    
`
    // 新增行数的负数
    renderCode.lineOffset = -3

    const {context, isolate} = await createIsolate(codes, true)
    setInterval(async () => {
        const res = await context.eval(`render({name: 'world'})`)
        console.log(res)
    }, 1000)
})()