const { Schema, model, Types, mongoose } = require('mongoose');
const User = require('./User');

const adSchema = new Schema({
    headline: {
        type: String,
        required: true,
        minlength: [4, 'Headline should be at least 4 chars long']
    },
    location: {
        type: String,
        required: true,
        minlength: [8, 'The location should be at least 8 chars long']
    },
    companyName: {
        type: String,
        required: true,
        minlength: [3, 'Company name should be at least 3 chars long']
    },
    companyDescription: {
        type: String,
        required: true,
        minlength: [40, 'Company description should be at least 40 chars long']
    },
    owner: {
        type: [Types.ObjectId],
        ref: 'User'
    },
    appliedJob: [
        {
            type: mongoose.Types.ObjectId,
            ref: User,
        }
    ]
});

adSchema.index({ name: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const Ad = model('Ad', adSchema);

module.exports = Ad;