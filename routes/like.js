const express = require('express')
const { verifyToken } = require('../middleware/auth')
const { likePost, unlikePost } = require('../controllers/like')

const router = express.Router()

router.post('/like/:id', verifyToken, likePost)
router.post('/unlike/:id', verifyToken, unlikePost)

module.exports = router