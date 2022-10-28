const { Schema, model, Types, mongoose } = require('mongoose');
const User = require('./User');

const URL_PATTERN = /https?:\/\/./i;

const houseingSchema = new Schema ({
    name: {
        type: String,
        required: true,
        minlength: [6, 'House name should be at least 6 characters long']
    },
    type: {
        type: String,
        enum: ['Appartment', 'Villa', 'House',],
        required: true,
    },
    year: {
        type: Number,
        required: true,
        min: [1850, 'Lowest alowed year is 1850'],
        max: [2021, 'Highest alowed year is 2021']
    },
    city: {
        type: String,
        required: true,
        minlength: [4, 'City name should be at least 4 characters long']
    },
    homeImg: {
        type: String,
        required: true,
        validate: {
            validator: (v) => URL_PATTERN.test(v),
            message: 'Invalid imgUrl'
        }
    },
    description: {
        type: String,
        required: true,
        // minlength: [60, 'Description should be at least 60 chars long']
    },
    availablePieces: {
        type: Number,
        required: true,
        min: [0, 'Available pieces should be positive number'],
        max: [10, 'Available pieces should be max 10'],
    },
    rentHome: [
        {
            type: mongoose.Types.ObjectId,
            ref: User,
        }
    ],
    owner: {
        type: [Types.ObjectId],
        ref: 'User'
    },
    rentUsers: [
        {
            type: Types.ObjectId,
            ref: 'User'
        }
    ]
});

houseingSchema.index({ name: 1}, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const Houseing = model('Houseing', houseingSchema);

module.exports = Houseing;