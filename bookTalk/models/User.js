const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    email: {
        type: String, 
        required: true, 
        unique: true, 
        minlength: [10, 'Email must be at least 10 char'] 
    },
    username: { 
        type: String,
        required: true, 
        unique: true, 
        minlength: [4, 'Username must be at least 4 char'] 
    },
    hashedPassword: { 
        type: String, 
        required: true 
    },
});

userSchema.index({ username: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);


module.exports = User;