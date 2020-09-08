const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController');
const Blog = require('../models/blog');

router.put('/edit-blog', (req, res) => {
  const blog = {
    title: 'Yoshi Party Edit 2',
    // snippet: 'about my new blog',
    // body: 'more about my new blog',
  };
  Blog.findByIdAndUpdate('5f0d8c7d101e681be864c4ff', blog, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.get('/blogs', blogController.blog_index);

router.post('/blogs', blogController.blog_create_post);

router.get('/blogs/create', blogController.blog_create_get);

router.get('/blogs/:id', blogController.blog_detail);

router.delete('/blogs/:id', blogController.blog_delete);

router.get('/blogs/edit/:id', blogController.blog_edit_post);

router.post('/blogs/edit/:id', blogController.blog_put);

//redirects
router.get('/about-us', (req, res) => {
  res.redirect('/about');
});

module.exports = router;
