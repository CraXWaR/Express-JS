const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const JWT_SECRET = '56dsa4d6as85dsa';

async function register(username, email, password) {
    const existsUsername = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    if (existsUsername) {
        throw new Error('Username is taken');
    }
    const existsEmail = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    if (existsEmail) {
        throw new Error('Email is taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
       username,
       email,
       hashedPassword 
    });

    const token = createSession(user);
    return token;
}
async function login(email, password) {
    const user = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if (!user) {
        throw new Error('Wrong email or password!')
    }

    const hasMatch = await bcrypt.compare(password, user.hashedPassword);

    if (hasMatch == false) {
        throw new Error('Wrong email or password!')
    }

    const token = createSession(user);
    return token
}

function createSession({ _id, username, email }) {
    const payload = {
        _id,
        username,
        email
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