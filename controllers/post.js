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

    pool.query('SELECT post.id, post.title, post.desc, post.created_at, comment.input, post.likes  FROM post INNER JOIN comment ON post.id = comment.post_id WHERE post.user_id = $1 ORDER BY post.created_at DESC',
        [user_id], (err, result) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                let i = 0

                comments = []
                let posts = []

                while (i < result.rows.length - 1) {
                    if (result.rows[i].id == result.rows[i + 1].id) {
                        comments.push(result.rows[i].input)
                        i++
                    } else {
                        comments.push(result.rows[i].input)
                        posts.push({
                            id: result.rows[i].id,
                            title: result.rows[i].title,
                            desc: result.rows[i].desc,
                            created_at: result.rows[i].created_at,
                            comments: comments,
                            likes: result.rows[i].likes
                        })
                        comments = []
                        i++
                    }
                }

                comments.push(result.rows[i].input)
                posts.push({
                    id: result.rows[i].id,
                    title: result.rows[i].title,
                    desc: result.rows[i].desc,
                    created_at: result.rows[i].created_at,
                    comments: comments,
                    likes: result.rows[i].likes
                })

                res.status(200).json(posts)
            }
        })
}

module.exports = { addPost, getPost, deletePost, getAllPosts }