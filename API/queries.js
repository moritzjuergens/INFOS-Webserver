const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'infosec',
  password: 'password',
  port: 5432,
})

//Users
const getUsers = (request, response) => {
    pool.query('SELECT * FROM blog.user ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM blog.user WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const createUser = (request, response) => {
    const { username, password } = request.body
  
    pool.query('INSERT INTO blog.user (username, password) VALUES ($1, $2)', [username, password], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.insertid}`)
    })
  }

  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM blog.user WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }
//Posts
  const getPosts = (request, response) => {
    pool.query('SELECT * FROM blog.post ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getPostById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM blog.post WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const createPost = (request, response) => {
    const { title, content } = request.body

    pool.query(`INSERT INTO blog.post (title, content) VALUES ('${title}', '${content}')`,(error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Post added with ID: ${results.insertid}`)
    })
  }

  const deletePost = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM blog.post WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Post deleted with ID: ${id}`)
    })
  }

  module.exports = {
    getUsers,
    getUserById,
    createUser,
    deleteUser,
    getPosts,
    getPostById,
    createPost,
    deletePost,
  }