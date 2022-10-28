const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true, 
        minlength: [3, 'At least 3 char'] 
    },
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        minlength: [3, 'At least 3 char'] 
    },
    hashedPassword: { type: String, 
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