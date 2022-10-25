const { Schema, model } = require('mongoose');

const EMAIL_PATTERN = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z]+$/i;

const userSchema = new Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        validate: {
            validator: (v) => EMAIL_PATTERN.test(v),
            message: 'Invalid Email'
        }
    },
    firstName: { 
        type: String, 
        required: true, 
        minlength: [1, 'First name should be at least 1 charcter'] 
    },
    lastName: { 
        type: String, 
        required: true, 
        minlength: [1, 'First name should be at least 1 charcter'] 
    },
    hashedPassword: { 
        type: String, 
        required: true 
    },
});

userSchema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});
userSchema.index({ firstName: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});
userSchema.index({ lastName: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);


module.exports = User;