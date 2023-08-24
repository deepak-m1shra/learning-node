const express = require('express');
const app = express();
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

// connect to mongodb
const dbURI = 'mongodb+srv://root:root@nodelearningcluster.h2sfxrm.mongodb.net/node-app?retryWrites=true&w=majority';

mongoose.connect(dbURI)
    .then((result) => app.listen(3000, () => {
        console.log("Listening on port 3000")
    }))
    .catch((err) => console.log(err))
// Using middleware
// app.use((req, res, next) => {
//     console.log("url : ", req.url);
//     console.log("method : ", req.headers);
//     console.log("body : ", req.body);
//     next();
// })

// Using morgan middleware used for logging 
app.use(morgan('dev'))

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'very good blog',
        body: 'just awesome blog'
    });
    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            console.log(err)
        })
})

app.get('/single-blog', (req, res) => {
    Blog.findById('64e76e51e9ab34d8a1f8a6ae')
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            console.log(err)
        })
})

app.get('/blogs', (req, res) => {
    Blog.find().sort()
        .then(result => {
            res.render('index', {
                title: 'All Blogs',
                blogs: result,
                username: 'Deepak'
            })
        })
        .catch(err => {
            console.log(err)
        })
})


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
