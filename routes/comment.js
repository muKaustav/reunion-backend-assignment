const express = require('express')
const { verifyToken } = require('../middleware/auth')
const { addComment } = require('../controllers/comment')

const router = express.Router()

router.post('/comment/:post_id', verifyToken, addComment)

module.exports = router