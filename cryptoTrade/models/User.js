const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        minlength: [10, 'At least 10 char']
    },
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        minlength: [5, 'At least 5 char'] 
    },
    hashedPassword: { type: String, 
        required: true 
    },
});

userSchema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

userSchema.index({ username: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);


module.exports = User;