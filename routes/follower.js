const express = require('express')
const { verifyToken } = require('../middleware/auth')
const { followUser, unfollowUser } = require('../controllers/follower')

const router = express.Router()

router.post('/follow/:id', verifyToken, followUser)
router.post('/unfollow/:id', verifyToken, unfollowUser)

module.exports = router