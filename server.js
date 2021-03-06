const cors = require('cors')
const express = require('express')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const postRoute = require('./routes/post')
const likeRoute = require('./routes/like')
const commentRoute = require('./routes/comment')
const followerRoute = require('./routes/follower')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.json({
        message: "Hello World",
        repository: "https://github.com/muKaustav/reunion-backend-assignment"
    })
})

app.use('/api', authRoute)
app.use('/api', userRoute)
app.use('/api', postRoute)
app.use('/api', likeRoute)
app.use('/api', commentRoute)
app.use('/api', followerRoute)

PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})