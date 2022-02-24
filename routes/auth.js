const express = require('express')
const { login } = require('../controllers/auth')

const router = express.Router()

router.post('/authenticate', login)

module.exports = router