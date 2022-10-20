const { Schema, model } = require('mongoose');


//todo add user propertiest and validation on task
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
        minlength: [4, 'At least 4 char'] 
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