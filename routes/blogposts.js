const express = require('express');
const blogPost = require('../models/blogpost');
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('blogposts/new', { blogpost: new blogPost() })
});

router.get('/:slug', async (req, res) => {
    const blogpost = await blogPost.findOne({ slug: req.params.slug })
    if (blogpost == null) res.redirect('/')
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
      res.redirect(`/blogposts/${blogpost.slug}`)
    } catch (e) {
        
        res.render('blogposts/new', { blogpost : blogpost })
    }
});

router.delete('/:id', async (req, res) => {
    await blogPost.findByIdAndDelete(req.params.id)
    res.redirect('/');
});

module.exports = router