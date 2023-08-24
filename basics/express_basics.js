const express = require('express');
const app = express();
const morgan = require('morgan')


// Using middleware
// app.use((req, res, next) => {
//     console.log("url : ", req.url);
//     console.log("method : ", req.headers);
//     console.log("body : ", req.body);
//     next();
// })

// Using morgan middleware used for logging 
app.use(morgan('dev'))


// Using middleware for static files
app.use(express.static('public'))

app.get('/', (req, res) => {
    console.log("This is the home page request")
    res.sendFile('./htmls/index.html', { root: __dirname })
})

app.set('view engine', 'ejs')

app.get('/ejs/home', (req, res) => {
    res.render('index', { username: 'Deepak', title: 'Home Page' })
})

app.get('/blogs/create', (req, res) => {
    blogs = [
        { title: "Harry Potter", snippet: "Amazing imagination filled with mystery" },
        { title: "The Kite Runner", snippet: "Khaled Hoseinni's masterpiece" },
        { title: "The Alchemist", snippet: "Paulo Coelho at his best. Inspriring, motitvating and thrilling" }
    ]
    res.render('create', { blogs, title: 'Create Blog Page' })
})

app.get('/ejs/about', (req, res) => {
    res.render('about', { title: 'About Page' })
})

app.get('/ejs/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us page' })
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