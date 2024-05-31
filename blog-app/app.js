const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

let posts = [];
let nextId = 1;

app.get('/', (req, res) => {
  res.render('layout', { body: 'partials/body', posts });
});

app.get('/new-post', (req, res) => {
  res.render('layout', { body: 'partials/form', posts: [] });
});

app.post('/new-post', (req, res) => {
  const { title, content } = req.body;
  if (title && content) {
    posts.push({ id: nextId++, title, content });
  }
  res.redirect('/');
});

app.get('/edit-post/:id', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (post) {
    res.render('layout', { body: 'partials/edit', posts: [], post });
  } else {
    res.redirect('/');
  }
});

app.post('/edit-post/:id', (req, res) => {
  const { title, content } = req.body;
  const post = posts.find(p => p.id == req.params.id);
  if (post && title && content) {
    post.title = title;
    post.content = content;
  }
  res.redirect('/');
});

app.post('/delete-post/:id', (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
