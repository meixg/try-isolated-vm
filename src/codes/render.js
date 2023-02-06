function render(data) {
    globalUtils.logger.warning(`some warning`)
    globalUtils.logger.fatal(`some fatal`)
    return `hello ${data.name}!`
}