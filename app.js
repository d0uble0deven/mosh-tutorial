// requirements
const path = require('path')
const os = require('os')
const fs = require('fs')
const EventEmitter = require('events')
const http = require('http')

// files (sync & async)
const syncFiles = fs.readdirSync('./')
console.log(syncFiles)

fs.readdir('./', function (err, files) {
    if (err) console.log('Error: ', err)
    else console.log('Result: ', files)
})

// memory
const totalMem = os.totalmem()
const freeMem = os.freemem()

console.log(totalMem)
console.log(freeMem)

// paths
const pathObj = path.parse(__filename)

console.log(pathObj)

// Events
const emitter = new EventEmitter()

const Logger = require('./logger')
const logger = new Logger()

// register a listener
logger.on('messageLogged', (event) => console.log('listener called', event))

logger.log('message from new class')



// http module
const server = http.createServer((req, res) => {
    if (req.url === '/app') {
        res.write('Hello World')
        res.end()
    }
    if (req.url === '/app/api/courses') {
        res.write(JSON.stringify([1, 2, 3]))
        res.end()
    }
})
// server.on('connection', (socket) => console.log('new connection'))
server.listen(3000)

console.log('listening on port 3000')