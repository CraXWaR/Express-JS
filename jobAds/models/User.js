const { Schema, model } = require('mongoose');


//todo add user propertiest and validation on task
const userSchema = new Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        minlength: [3, 'At least 3 char'] 
    },
    hashedPassword: { 
        type: String, 
        required: true 
    },
    skills: {
        type: String,
        required: true,
        minlength: [40, 'Skrills description must be at least 40 characters long']
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