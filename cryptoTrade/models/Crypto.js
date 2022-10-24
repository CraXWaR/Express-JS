const { Schema, model, Types, mongoose } = require('mongoose');
const User = require('./User');

const URL_PATTERN = /https?:\/\/./i;

const cryptoSchema = new Schema ({
    name: {
        type: String,
        required: true,
        minlength: [2, 'Name should be at least 2 chars long']
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: (v) => URL_PATTERN.test(v),
            message: 'Invalid imgUrl'
        }
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price should be positive number']
    },
    cryptoDescription: {
        type: String,
        minlength: [10, 'Description should be at least 10 chars long']
    },
    paymentMethod: {
        type: String,
    },
    buyCrypto: [
        {
            type: mongoose.Types.ObjectId,
            ref: User,
        }
    ],
    owner: {
        type: [Types.ObjectId],
        ref: 'User'
    }
});

cryptoSchema.index({ name: 1}, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const Crypto = model('Crypto', cryptoSchema);

module.exports = Crypto;