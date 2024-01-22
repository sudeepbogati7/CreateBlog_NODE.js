const mongoose = require('mongoose');
const { User } = require('./user');
const blogSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true
    },
    desc : {
        type : String, 
        required: true, 
        min:20
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
});


const Blog = mongoose.model('Blog', blogSchema);



module.exports = {
    Blog : Blog, 
    blogSchema : blogSchema
}
