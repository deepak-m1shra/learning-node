const http = require('http')

const server = http.createServer((req, res) => {
    console.log("request received")
    console.log(req.url, req.headers)
    res.end(`hey there, request successful! ${req.url} && ${req.headers}`)
})

server.listen(3000, 'localhost', () => {
    console.log('Listening at port 3000')
})