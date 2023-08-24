const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    console.log(req.url, req.headers, req.method);
    res.setHeader('Content-Type', 'text/html')
    res.write('hello fellas');
    res.write('<b> This is bold </b>')
    res.write(`<table style= "border: solid 2px">
                    <th>Name</th>
                    <th>Salary</th>
                    <tr>
                        <td>Deepak</td>
                        <td>4700000</td>
                    </tr>
                    <tr>
                        <td>Divit</td>
                        <td>999999999</td>
                    </tr>
               </table>`)
    // res.end(`<table style= "border: solid 2px">
    //                     <th>Name</th>
    //                     <th>Salary</th>
    //                     <tr>
    //                         <td>Deepak</td>
    //                         <td>4700000</td>
    //                     </tr>
    //                     <tr>
    //                         <td>Divit</td>
    //                         <td>999999999</td>
    //                     </tr>
    //             </table>`)

    let path = "./htmls/"

    switch (req.url) {
        case '/about':
            path += 'about.html'
            break;
        case '/about-me':
            res.statusCode = 300
            res.setHeader('Location', '/about')
            // res.end()
            break;
        case '/contact':
            path += 'contact.html'
            break;
        case '/':
            path += 'index.html'
            break;
        default: path += '404.html'
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err)
            res.end()
        } else {
            res.write(data)
            res.end()
        }
    })

})

server.listen(3000, 'localhost', () => {
    console.log('listening on port 3000')
})
