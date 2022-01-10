const express = require('express');
const blogPost = require('../models/blogpost');
const router = express.Router();

router.get('/new', (req, res) => {
  res.render('blogposts/new', { blogpost: new blogPost() })
})

router.get('/edit/:id', async (req, res) => {
  const blogpost = await blogPost.findById(req.params.id)
  res.render('blogposts/edit', { blogpost: blogpost })
})

router.get('/:slug', async (req, res) => {
  const blogpost = await blogPost.findOne({ slug: req.params.slug })
  if (blogpost == null) res.redirect('/')
  res.render('blogposts/show', { blogpost: blogpost })
})

router.post('/', async (req, res, next) => {
  req.blogpost = new blogPost()
  next()
}, savePostAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
  req.blogpost = await blogPost.findById(req.params.id)
  next()
}, savePostAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
  await blogPost.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

function savePostAndRedirect(path) {
  return async (req, res) => {
    let blogpost = req.blogpost
    blogpost.title = req.body.title
    blogpost.description = req.body.description
    blogpost.markdown = req.body.markdown
    try {
      blogpost = await blogpost.save()
      res.redirect(`/blogposts/${blogpost.slug}`)
    } catch (e) {
      res.render(`blogposts/${path}`, { blogpost: blogpost })
      console.log(e);
    }
  }
}

module.exports = router