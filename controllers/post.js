const pool = require('../postgreSQL/pool')

let addPost = async (req, res) => {
    let { title, desc } = req.body
    let user_id = req.user.id

    pool.query('INSERT INTO post (user_id, title, "desc", likes) VALUES ($1, $2, $3, $4) RETURNING id, title, "desc", created_at',
        [user_id, title, desc, 0], (err, result) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.status(201).json(result.rows[0])
            }
        })
}

let getPost = async (req, res) => {
    let { id } = req.params

    pool.query('SELECT likes, (SELECT COUNT(*) FROM comment WHERE post_id = $1) AS comments FROM post WHERE id = $1',
        [id], (err, result) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.status(200).json(result.rows[0])
            }
        })
}

let deletePost = async (req, res) => {
    let { id } = req.params
    let user_id = req.user.id

    pool.query('DELETE FROM post WHERE id = $1 AND user_id = $2 RETURNING id',
        [id, user_id], (err, result) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.status(200).json(result.rows[0])
            }
        })
}

let getAllPosts = async (req, res) => {

    // GET /api/all_posts would return all posts created by authenticated user sorted by post time.
    //   - RETURN: For each post return the following values
    //     - id: ID of the post
    //     - title: Title of the post
    //     - desc: Description of the post
    //     - created_at: Date and time when the post was created
    //     - comments: Array of comments, for the particular post
    //     - likes: Number of likes for the particular post   

    let user_id = req.user.id

    // pool.query('SELECT id, title, "desc", created_at, (SELECT input FROM comment WHERE post_id = post.id) AS comments, likes FROM post WHERE user_id = $1 ORDER BY created_at DESC',
    //     [user_id], (err, result) => {
    //         if (err) {
    //             console.log(err)
    //             res.status(500).send(err)
    //         } else {
    //             res.status(200).json(result.rows)
    //         }
    //     })

    pool.query('SELECT post.id, post.title, post.desc, post.created_at, comment.input, post.likes  FROM post INNER JOIN comment ON post.id = comment.post_id WHERE post.user_id = $1 ORDER BY post.created_at DESC',
        [user_id], (err, result) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                let posts = result.rows.map(post => {
                    // check if post with id exists in posts array
                    let comments = post.input ? post.input.split(',') : []
                    return {
                        id: post.id,
                        title: post.title,
                        desc: post.desc,
                        created_at: post.created_at,
                        comments: comments,
                        likes: post.likes
                    }
                })
                res.status(200).json(posts)
            }
        })
}

module.exports = { addPost, getPost, deletePost, getAllPosts }