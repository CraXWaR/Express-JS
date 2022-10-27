const { Schema, model, Types, mongoose } = require('mongoose');
const User = require('./User');

const URL_PATTERN = /https?:\/\/./i;

const tripSchema = new Schema({
    startPoint: {
        type: String,
        required: true
    },
    endPoint: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    carImage: {
        type: String,
        required: true,
        validate: {
            validator: (v) => URL_PATTERN.test(v),
            message: 'Invalid car image'
        }
    },
    carBrand: {
        type: String,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    owner: {
        type: [Types.ObjectId],
        ref: 'User'
    },
    buddies: [
        {
            type: mongoose.Types.ObjectId,
            ref: User,
        }
    ],
    ownerEmail: {
        type: String,
    }
});

tripSchema.index({ startPoint: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

tripSchema.index({ endPoint: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const Trip = model('Trip', tripSchema);

module.exports = Trip;