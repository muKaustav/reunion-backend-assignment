const express = require('express')
const { verifyToken } = require('../middleware/auth')
const { getUsers, postUser, getUser } = require('../controllers/user')

const router = express.Router()

router.get('/list_users', verifyToken, getUsers)
router.post('/register', verifyToken, postUser)

router.get('/user', verifyToken, getUser)

module.exports = router