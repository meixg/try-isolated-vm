const path = require('path')
const fs = require('fs/promises')

const codes = []

async function loadAllCodes() {
    if (codes.length > 0) {
        return codes
    }

    const runtimeFilename = path.resolve(__dirname, '../codes/runtime.js')
    const runtimeCode = await fs.readFile(runtimeFilename, 'utf-8')
    codes.push({
        code: runtimeCode,
        filename: runtimeFilename
    })

    const files = await fs.readdir(path.resolve(__dirname, '../codes'))
    for (const file of files) {
        if (file.endsWith('.js') && !file.endsWith('runtime.js')) {
            const filename = path.resolve(__dirname, '../codes', file)
            const code = await fs.readFile(filename, 'utf-8')
            codes.push({
                code,
                filename
            })
        }
    }

    return codes
}

module.exports = {
    loadAllCodes
}
