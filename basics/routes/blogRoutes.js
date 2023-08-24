const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogController')


router.post('/', blogController.create_blog_post)

router.get('/', blogController.list_all_blogs)

router.get('/create', blogController.create_static_blogs_list)

router.get('/:id', blogController.get_blog_by_id)

router.delete('/:id', blogController.delete_blog_by_id)

module.exports = router