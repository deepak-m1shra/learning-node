const express = require('express')
const Blog = require('../models/blog')


const create_blog_post = (req, res) => {
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
}

const list_all_blogs = (req, res) => {
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
}

const create_static_blogs_list = (req, res) => {
    blogs = [
        { title: "Harry Potter", snippet: "Amazing imagination filled with mystery" },
        { title: "The Kite Runner", snippet: "Khaled Hoseinni's masterpiece" },
        { title: "The Alchemist", snippet: "Paulo Coelho at his best. Inspriring, motitvating and thrilling" }
    ]
    res.render('create', { blogs, title: 'Create Blog Page' })
}

const get_blog_by_id = (req, res) => {
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
}

const delete_blog_by_id = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' })
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = {
    create_blog_post,
    list_all_blogs,
    create_static_blogs_list,
    get_blog_by_id,
    delete_blog_by_id


}