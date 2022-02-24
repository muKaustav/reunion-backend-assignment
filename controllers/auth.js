require('dotenv').config()
const pool = require('../postgreSQL/pool')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')

let login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            res.status(400).send('Email or password missing.')
        }

        let token = ''

        const user = await pool.query('SELECT * FROM "user" WHERE email = $1', [email])

        if (user && (await bcrypt.compare(password, user.rows[0].password))) {
            token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '2h' })
        }

        user.token = token
        res.status(201).send(user)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

module.exports = { login }