const express = require('express');
const blogPost = require('../models/blogpost');
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('blogposts/new', { blogpost: new blogPost() })
});

router.get('/:id', (req, res) => {
    const blogpost = blogPost.findById(req.params.id)
    res.render('blogposts/show', { blogpost: blogpost })
});

router.post('/', async (req, res) => {
    let blogpost= new blogPost({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try {
      blogpost = await  blogpost.save()
      res.redirect(`/blogposts/${blogpost.id}`)
    } catch (e) {
        
        res.render('blogposts/new', { blogpost : blogpost })
    }

  
});

module.exports = router