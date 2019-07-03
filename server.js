const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 4000;

let Blog = require('./blog.model');
app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://127.0.0.1:27017/blog-data', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

const blogRoutes = express.Router();

app.use('/blogs', blogRoutes);

blogRoutes.route('/').get(function(req, res) {
    Blog.find(function(err, blogs) {
        if (err) {
            console.log(err);
        } else {
            res.json(blogs);
        }
    });
});

blogRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Blog.findById(id, function(err, blog) {
        res.json(blog);
    });
});

blogRoutes.route('/add').post(function(req, res) {
    let blog = new Blog(req.body);
    blog.save()
        .then(blog => {
            res.status(200).json({'blog': 'Blog added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new Blog failed');
        });
});

blogRoutes.route('/update/:id').post(function(req, res) {
    Blog.findById(req.params.id, function(err, blog) {
        if (!blog)
            res.status(404).send("data is not found");
        else
        blog.blog_title = req.body.blog_title;
        blog.blog_description = req.body.blog_description;
         
        blog.save().then(blog => {
                res.json('blog updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

app.use('/blogs', blogRoutes);


app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});