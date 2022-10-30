const { Schema, model, Types, mongoose } = require('mongoose');
const User = require('./User');

const URL_PATTERN = /https?:\/\/./i;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        min: [5, 'Title should be at least 5 characters'],
        mix: [50, 'Title cant be more than 50 characters']
    },
    blogImg: {
        type: String,
        required: true,
        validate: {
            validator: (v) => URL_PATTERN.test(v),
            message: 'Invalid imgUrl'
        }
    },
    blogContent: {
        type: String,
        required: true,
        minlength: [10, 'Blog content should be at least 10 characters']
    },
    blogCategory: {
        type: String,
        required: true,
        minlength: [3, 'Blog category be at least 3 characters']
    },
    followList: [
        {
            type: mongoose.Types.ObjectId,
            ref: User,
        }
    ],
    followUsers: [
        {
            type: Types.ObjectId,
            ref: 'User'
        }
    ],
    owner: {
        type: [Types.ObjectId],
        ref: 'User'
    },
    ownerEmail: {
        type: String,
    }
});

blogSchema.index({ title: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const Blog = model('Blog', blogSchema)

module.exports = Blog;
