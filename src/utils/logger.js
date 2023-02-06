const Ylogger = require('yog-log')
const path = require('path')

const logConf = {
    app: 'yog',
    log_path: path.resolve(__dirname, '../../logs'),
    intLevel: 4
}
const logger = Ylogger.getLogger(logConf)

module.exports = {
    logger
}
