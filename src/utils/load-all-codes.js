const path = require('path')
const fs = require('fs/promises')

const codes = []

async function loadAllCodes() {
    if (codes.length > 0) {
        return codes
    }

    const runtimeCode = await fs.readFile(path.resolve(__dirname, '../codes/runtime.js'), 'utf-8')
    codes.push(runtimeCode)

    const files = await fs.readdir(path.resolve(__dirname, '../codes'))
    for (const file of files) {
        if (file.endsWith('.js') && !file.endsWith('runtime.js')) {
            const code = await fs.readFile(path.resolve(__dirname, '../codes', file), 'utf-8')
            codes.push(code)
        }
    }

    return codes
}

module.exports = {
    loadAllCodes
}
