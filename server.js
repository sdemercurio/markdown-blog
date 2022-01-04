const express = require('express');
const postRouter = require('./routes/posts');
const app = express();

app.set('view engine', 'ejs');

app.use('/public', express.static('public'));

app.use('/posts', postRouter)

app.get('/', (req, res) => {
    const posts = [{
        title: 'Test Post',
        dateCreated: new Date(),
        description: 'Test description'
    },
    {
        title: 'Test Post 2',
        dateCreated: new Date(),
        description: 'Test description 2'
    }
    ]
    res.render('posts/index', { posts: posts })
})

app.listen(5000)