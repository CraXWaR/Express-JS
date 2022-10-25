const { Schema, model, Types, mongoose  } = require('mongoose');
const User = require('./User');

const URL_PATTERN = /https?:\/\/./i;

const auctionSchema = new Schema({
    title: {
        type: String,
        required: true,
        min: [4, 'Titlte must be at least 4 characters long']
    },
    description: {
        type: String,
        max: [200, 'Description can\'t be more than 200 characters']
    },
    category: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        validate: {
            validator: (v) => URL_PATTERN.test(v),
            message: 'Invalid image url'
        }
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price can\'t be negative number']
    },
    owner: {
        type: [Types.ObjectId],
        ref: 'User'
    },
    firstName: {
        type: String,
        ref: 'User'
    },
    lastName: {
        type: String,
        ref: 'User'
    },
    biddList: [
        {
            type: mongoose.Types.ObjectId,
            ref: User,
        }
    ]
});

const Auction = model('Auction', auctionSchema);

module.exports = Auction;