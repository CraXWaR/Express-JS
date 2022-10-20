const { getAllBooks } = require('../services/bookService');

const homeController = require('express').Router();

homeController.get('/', (req, res) => {
    res.render('home', {
        title: 'Home Page',
        user: req.user
    });
});

homeController.get('/catalog', (req, res) => {
    const books = getAllBooks();
    res.render('books/catalog', {
        title: 'Books Catalog',
        books
    })
})

module.exports = homeController;