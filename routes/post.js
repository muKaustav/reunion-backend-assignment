const express = require('express')
const { verifyToken } = require('../middleware/auth')
const { addPost, getPost, deletePost, getAllPosts } = require('../controllers/post')

const router = express.Router()

router.post('/posts', verifyToken, addPost)
router.get('/posts/:id', verifyToken, getPost)
router.delete('/posts/:id', verifyToken, deletePost)
router.get('/all_posts', verifyToken, getAllPosts)

module.exports = router