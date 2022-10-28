const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    fullName: { 
        type: String, 
        required: true, 
    },
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        minlength: [5, 'At least 5 char'] 
    },
    hashedPassword: { 
        type: String, 
        required: true 
    },
});

userSchema.index({ name: 1 }, {
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