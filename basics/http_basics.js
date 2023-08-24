const http = require('https')

const req = http.request('http://www.google.com', (res) => {
    res.on('data', (chunk) => {
        console.log(chunk)
    })
    res.on('end', () => {
        console.log("No more data")
    })
})

req.end()