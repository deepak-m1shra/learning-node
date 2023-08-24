const EventEmitter = require('events');

const cricketer = new EventEmitter();

cricketer.on('six', () => console.log("That was an awesome shot!"))
cricketer.on('six', () => console.log("Counld have been longer"))

cricketer.emit('six')
process.on('exit', (code) => {
    console.log("Process exit with the code", code)
})