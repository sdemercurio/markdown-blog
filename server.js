require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const postRouter = require('./routes/blogposts');
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

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    const blogposts = [{
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
    res.render('blogposts/index', { blogposts: blogposts })
})

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    
})

app.use('/blogposts', postRouter);

app.listen(5000)