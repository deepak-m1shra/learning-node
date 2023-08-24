const express = require('express')
const router = express.Router()
const Blog = require('../models/blog')

router.post('/', (req, res) => {
    console.log('In /blogs method :: ', req.body)
    const blog = new Blog(req.body);

    blog.save()
        .then(result => {
            // res.send(result)
            res.redirect('/blogs')
        })
        .catch(err => {
            console.log(err)
        })
})

router.get('/', (req, res) => {
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

router.get('/create', (req, res) => {
    blogs = [
        { title: "Harry Potter", snippet: "Amazing imagination filled with mystery" },
        { title: "The Kite Runner", snippet: "Khaled Hoseinni's masterpiece" },
        { title: "The Alchemist", snippet: "Paulo Coelho at his best. Inspriring, motitvating and thrilling" }
    ]
    res.render('create', { blogs, title: 'Create Blog Page' })
})

router.get('/:id', (req, res) => {
    Blog.findById(req.params.id)
        .then(result => {
            res.render('details', {
                blog: result,
                title: 'Blog Details'
            })
        })
        .catch(err => {
            console.log(err)
        })

})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' })
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router