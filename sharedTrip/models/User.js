const { Schema, model } = require('mongoose');

const URL_PATTERN = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z]+$/i

const userSchema = new Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        validate: {
            validator: (v) => URL_PATTERN.test(v),
            message: 'Invalid email'
        }
    },
    hashedPassword: { 
        type: String, 
        required: true 
    },
    gender: {
        type: String, 
        required: true,
    }
});

userSchema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);


module.exports = User;