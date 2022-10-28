const { register, login } = require('../services/userService');
const { parseError } = require('../util/parser');

const authController = require('express').Router();


authController.get('/register', (req, res) => {
    res.render('auth/register', {
        title: 'Register Page'
    });
});

authController.post('/register', async (req, res) => {
    try {
        if (req.body.fullName == '' || req.body.username == '' || req.body.password == '') {
            throw new Error('All field are required!')
        }
        if (req.body.password.length < 4) {
            throw new Error('Password must be at least 4 characters!')
        }
        if (req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t match!')
        }
        const token = await register(req.body.fullName, req.body.username, req.body.password);

        res.cookie('token', token);
        res.redirect('/'); 
    } catch (error) {
        //error parser
        console.log(error);
        const errors = parseError(error);

        res.render('auth/register', {
            title: 'Register Page',
            errors,
            body: {
                fullName: req.body.fullName,
                username: req.body.username
            }
        });
    }
});

authController.get('/login', (req, res) => {
    res.render('auth/login', {
        title: 'Login Page'
    });
});

authController.post('/login', async (req, res) => {
   try {
        const token = await login(req.body.username, req.body.password);
        
        res.cookie('token', token);
        res.redirect('/'); 
   } catch (error) {
        const errors = parseError(error);
        res.render('auth/login', {
            title: 'Login Page',
            errors,
            body: {
                username: req.body.username
            }
        });
   } 
});

authController.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/')
});

module.exports = authController;