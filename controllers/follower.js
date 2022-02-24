const pool = require('../postgreSQL/pool')

let followUser = async (req, res) => {

    let user_id = req.user.id, { id } = req.params

    if (user_id != id) {

        pool.query('INSERT INTO follower (follower_user_id, following_user_id) SELECT $1, $2 WHERE NOT EXISTS (SELECT * FROM follower WHERE follower_user_id = $1 AND following_user_id = $2)',
            [user_id, id],
            (err, results) => {
                if (err) {
                    console.log(err)
                    res.status(500).send(err)
                } else {
                    console.log(results)
                    res.status(201).send('User followed.')
                }
            })
    } else {
        res.status(400).send('You cannot follow yourself.')
    }
}

let unfollowUser = async (req, res) => {

    let user_id = req.user.id, { id } = req.params

    if (user_id != id) {

        pool.query('DELETE FROM follower WHERE follower_user_id = $1 AND following_user_id = $2',
            [user_id, id],
            (err, results) => {
                if (err) {
                    console.log(err)
                    res.status(500).send(err)
                } else {
                    console.log(results)
                    res.status(201).send('User unfollowed.')
                }
            })
    } else {
        res.status(400).send('You cannot unfollow yourself.')
    }
}

module.exports = { followUser, unfollowUser }