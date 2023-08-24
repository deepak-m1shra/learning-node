const fs = require('fs')

const readStream = fs.createReadStream('./files/lorem_ipsum.html', { encoding: 'utf-8' })
const writeStream = fs.createWriteStream('./files/lorem_write_ipsum.html')

/**
readStream.on('data', (chunk) => {
    console.log("======RECEIVED THE CHUNK======")
    console.log(chunk)
    writeStream.write('\nTHIS IS A NEW CHUNK \n\n\n\n\\n\n')
    writeStream.write(chunk)
})

**/

// Piping

readStream.pipe(writeStream)