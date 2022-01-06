require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const blogPost = require('./models/blogpost');
const postRouter = require('./routes/blogposts');
const methodOverride = require('method-override');
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
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
    const blogposts = await blogPost.find().sort({
        dateCreated: 'desc'})
    
    res.render('blogposts/index', { blogposts: blogposts })
})

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    
})

app.use('/blogposts', postRouter);

app.listen(5000)