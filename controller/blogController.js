const Blog = require('../models/blog');

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', { title: 'All Blogs', blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_detail = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch((err) => {
      res.status(404).render('404', { title: 'Blog not found' });
    });
};

const blog_create_get = (req, res) => {
  res.render('create', { title: 'Create a new blog' });
};

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  console.log(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      //can't redirect với res. vì đây là ajax request.
      res.json({ redirect: '/blogs' });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_edit_post = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render('edit', { title: 'Edit Post', blog: result });
    })
    .catch((err) => {
      res.status(404).render('404', { title: 'Blog not found' });
    });
};

const blog_put = (req, res) => {
  const id = req.params.id;
  // res.json({ redirect: '/blogs' });
  // console.log(req.body);
  Blog.findByIdAndUpdate(id, req.body, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.redirect('/blogs');
    }
  }).catch((err) => {
    console.log(err);
  });
};

module.exports = {
  blog_index,
  blog_detail,
  blog_create_get,
  blog_create_post,
  blog_delete,
  blog_edit_post,
  blog_put,
};
