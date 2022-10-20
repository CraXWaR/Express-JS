const { Schema, model, Types } = require('mongoose');

const URL_PATTERN = /https?:\/\/./i;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        validate: {
            validator: (v) => URL_PATTERN.test(v),
            message: 'Invalid imgUrl'
        }
    },
    bookReview: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 5
    },
    wishList: {
        type: [Types.ObjectId],
        ref: 'User',
        default: []
    },
    owner: {
        type: [Types.ObjectId],
        ref: 'User'
    }
});

bookSchema.index({ title: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const Book = model('Book', bookSchema);

module.exports = Book;