require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const postRouter = require('./routes/posts');
const app = express();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true
        });
    } catch (err) {
        console.log(err);
    }
};

connectDB();

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

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    
})
app.listen(5000)