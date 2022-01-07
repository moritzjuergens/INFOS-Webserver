const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const db = require('./queries');
const { v4: uuid } = require('uuid');

app.use(express.json());
app.use(cors({ credentials: true }));

app.listen(PORT, () => console.log(`listening on https://localhost:${PORT}`));

app.get('/login', (req, res) => {
  res.json({ sessionId: uuid() });
});
app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.post('/users', db.createUser);
app.delete('/users/:id', db.deleteUser);

app.get('/posts', db.getPosts);
app.get('/posts/:id', db.getPostById);
app.post('/posts', db.createPost);
app.delete('/posts/:id', db.deletePost);
