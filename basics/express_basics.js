const express = require('express');
const app = express();

app.get('/', (req, res) => {
    console.log("This is the home page request")
    res.sendFile('./htmls/index.html', { root: __dirname })
})

app.get('/home', (req, res) => {
    res.redirect('/')
})

app.get('/about', (req, res) => {
    console.log("Request received")
    res.sendFile('./htmls/about.html', { root: __dirname })
})

app.get('/contact', (req, res) => {
    console.log("Request received")
    res.sendFile('./htmls/contact.html', { root: __dirname })
})

// 404 page
app.use((req, res) => {
    res.status(404).sendFile('./htmls/404.html', { root: __dirname })
})


app.listen(3000, () => {
    console.log("Listening on port 3000")
})