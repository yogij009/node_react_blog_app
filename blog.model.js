const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Blog = new Schema({
    blog_title: {
        type: String
    },
    blog_description: {
        type: String
    }
});
module.exports = mongoose.model('Blog', Blog);