const express = require('express');
const app = express();
const morgan = require('morgan')
const mongoose = require('mongoose')

const blogRoutes = require('./routes/blogRoutes');
const router = require('./routes/blogRoutes');

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

// Using middleware for static files
app.use(express.static('public'))
app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true })) // required to read from form fields

// Using morgan middleware used for logging 
app.use(morgan('dev'))

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog(req.body);
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

app.get('/', (req, res) => {
    console.log("This is the home page request")
    res.sendFile('./htmls/index.html', { root: __dirname })
})

app.get('/ejs/home', (req, res) => {
    res.redirect('/blogs')
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

// Use the imported route as a middleware & scoping to specific route
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).sendFile('./htmls/404.html', { root: __dirname })
})
