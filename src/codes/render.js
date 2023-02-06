function render(data) {
    globalUtils.logger.warning(`some warning`)
    globalUtils.logger.fatal(`some fatal`)
    return `hello ${data.name}!`
}

async function renderWithCache(data) {
    globalUtils.cache.set('bar', 'foo')
    const foo = await globalUtils.cache.get('foo')
    return `hello ${data.name} ${foo}!`
}