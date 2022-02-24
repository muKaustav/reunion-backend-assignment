const pool = require('../postgreSQL/pool')

let addComment = async (req, res) => {
    let { post_id } = req.params
    let comment = req.body.comment
    let user_id = req.user.id

    let query = await pool.query('INSERT INTO comment (input, post_id, user_id) VALUES ($1, $2, $3) RETURNING id',
        [comment, post_id, user_id])

    res.json(query.rows[0])
}

module.exports = { addComment }