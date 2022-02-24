const pool = require('../postgreSQL/pool')
const bcrypt = require('bcryptjs')

let getUsers = async (req, res) => {
    pool.query('SELECT * FROM "user"', (err, results) => {
        if (err) {
            console.log(err)
            res.status(500).send(err)
        } else {
            console.log(results)
            res.status(200).send(results.rows)
        }
    })
}

let postUser = async (req, res) => {
    let { username, name, email, password } = req.body

    pool.query('INSERT INTO "user" (username, name, email, password) VALUES ($1, $2, $3, $4)',
        [username, name, email, await bcrypt.hash(password, 10)],
        (err, results) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                // console.log(password)
                console.log(results)
                res.status(201).send('User added.')
            }
        })
}

let getUser = async (req, res) => {
    // RETURN: User Name, number of followers & followings.

    let id = req.user.id

    pool.query('SELECT username, (SELECT COUNT(*) FROM follower WHERE following_user_id = $1) AS followers, (SELECT COUNT(*) FROM follower WHERE follower_user_id = $1) AS followings FROM "user" WHERE id = $1',
        [id],
        (err, results) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                console.log(results)
                res.status(200).send(results.rows[0])
            }
        })
}

module.exports = { getUsers, postUser, getUser }

// {
//     "username":"kauc",
//     "name":"Kaustav M",
//     "email":"mu.kaustav@gmail.com",
//     "password":"ilovepizzza"
// }