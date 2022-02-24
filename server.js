const cors = require('cors')
const express = require('express')
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')
const likeRoute = require('./routes/like')
const commentRoute = require('./routes/comment')
const followerRoute = require('./routes/follower')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', userRoute)
app.use('/api', authRoute)
app.use('/api', postRoute)
app.use('/api', likeRoute)
app.use('/api', commentRoute)
app.use('/api', followerRoute)

PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})