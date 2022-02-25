<h1 align="center">Reunion Backend Assignment</h1>
<br/>

## 📚 | Problem Statement

- Build APIs for a social media platform in either NodeJS or Python.
- The API should support features like getting a user profile, follow a user, upload a post, delete a post, like a post, unlike a liked post, and comment on a post.
- Design the database schema and implement in PostgreSQL.
- _This is the take home assignment for the role of Backend intern at <a href="https://www.re-union.one/" target='_blank'>Reunion</a>._

<br/>

## 🚀 | API Endpoints

- POST /api/authenticate should perform user authentication and return a JWT token.

  - INPUT: Email, Password
  - RETURN: JWT token

  ➡️ **NOTE:** Use dummy email & password for authentication. No need to create endpoint for registering new user.

- POST /api/follow/{id} authenticated user would follow user with {id}
- POST /api/unfollow/{id} authenticated user would unfollow a user with {id}
- GET /api/user should authenticate the request and return the respective user profile.
  - RETURN: User Name, number of followers & followings.
- POST api/posts/ would add a new post created by the authenticated user.
  - Input: Title, Description
  - RETURN: Post-ID, Title, Description, Created Time(UTC).
- DELETE api/posts/{id} would delete post with {id} created by the authenticated user.
- POST /api/like/{id} would like the post with {id} by the authenticated user.
- POST /api/unlike/{id} would unlike the post with {id} by the authenticated user.
- POST /api/comment/{id} add comment for post with {id} by the authenticated user.
  - Input: Comment
  - Return: Comment-ID
- GET api/posts/{id} would return a single post with {id} populated with its number of likes and comments

- GET /api/all_posts would return all posts created by authenticated user sorted by post time.
  - RETURN: For each post return the following values
    - id: ID of the post
    - title: Title of the post
    - desc: Description of the post
    - created_at: Date and time when the post was created
    - comments: Array of comments, for the particular post
    - likes: Number of likes for the particular post

<br/>

## 📘 | Database Architecture

<p align = center>
    <img alt="getURL" src="https://raw.githubusercontent.com/muKaustav/reunion-backend-assignment/main/assets/db_architecture.png" target="_blank" />
</p>

<br/>

## 🧑🏽 | Author

**Kaustav Mukhopadhyay**

- Linkedin: [@kaustavmukhopadhyay](https://www.linkedin.com/in/kaustavmukhopadhyay/)
- Github: [@muKaustav](https://github.com/muKaustav)

---
