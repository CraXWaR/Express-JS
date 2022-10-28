const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const JWT_SECRET = '56dsa4d6as85dsa';

//todo username mby be email depends on task need check as username
async function register(fullName, username, password) {
    const exists = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    if (exists) {
        throw new Error('Username is taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        fullName,
        username,
        hashedPassword 
    });

    const token = createSession(user);
    return token;
}

async function login(username, password) {
    const user = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    if (!user) {
        throw new Error('Wrong username or password!')
    }

    const hasMatch = await bcrypt.compare(password, user.hashedPassword);

    if (hasMatch == false) {
        throw new Error('Wrong username or password!')
    }

    const token = createSession(user);
    return token
}

function createSession({ _id, username, fullName}) {
    const payload = {
        _id,
        username,
        fullName
    };

    const token = jwt.sign(payload, JWT_SECRET);
    return token;
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET)
}

module.exports = {
    register,
    login,
    verifyToken
};