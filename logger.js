// (function (exports, require, module, __filename, __dirname) {
const EventEmitter = require('events')

var url = 'http://mylogger.io/log'

class Logger extends EventEmitter {
    log(message) {
        // send an http request
        console.log(message)
        // raise an event
        this.emit('messageLogged', { id: 1, url: 'http://' })
    }
}

module.exports = Logger
// })