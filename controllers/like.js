const pool = require('../postgreSQL/pool')

let likePost = async (req, res) => {
    let { id } = req.params

    let query = await pool.query(`select likes from post where id = ${id}`)
    let result = await pool.query(`UPDATE post SET likes = ${query.rows[0].likes + 1} WHERE id = ${id}`)

    res.json(result)
}

let unlikePost = async (req, res) => {
    let { id } = req.params

    let query = await pool.query(`select likes from post where id = ${id}`)
    let result = await pool.query(`UPDATE post SET likes = ${query.rows[0].likes - 1} WHERE id = ${id}`)

    res.json(result)
}

module.exports = { likePost, unlikePost }