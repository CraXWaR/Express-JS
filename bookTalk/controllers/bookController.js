const { hasUser } = require('../middlewares/guards');
const { getBookById, getAllBooks, createBookReview, wishBook } = require('../services/bookService');
const { parseError } = require('../util/parser');

const bookController = require('express').Router();

bookController.get('/create', hasUser(), (req, res) => {
    res.render('books/create', {
        title: 'Book Create',
        user: req.user
    })
});


bookController.post('/create', async (req, res) => {
    const book = {
        title: req.body.title,
        author: req.body.author,
        imageUrl: req.body.imageUrl,
        bookReview: req.body.bookReview,
        genre: req.body.genre,
        stars: req.body.stars,
        owner: req.user._id
    };

    try {
        await createBookReview(book);
        res.redirect('/catalog');
    } catch (error) {
        res.render('books/create', {
            title: 'Book Create',
            body: book,
            errors: parseError(error)
        })
    }
});


bookController.get('/catalog', async (req, res) => {
    const books = await getAllBooks();
    res.render('books/catalog', {
        title: 'Books Catalog',
        user: req.user,
        books
    })
})

bookController.get('/details/:id', async (req, res) => {
    const book = await getBookById(req.params.id);

    if (req.user._id) {
        book.isOwner = book.owner.toString() == req.user._id.toString();
        book.isWished = book.wishList.some((id) => id == req.user._id);
    }

    res.render('books/details', {
        title: book.title,
        user: req.user,
        book
    });
});

bookController.get('/details/:id/wish', hasUser(), async (req, res) => {
    await wishBook(req.params.id, req.user._id);
    res.redirect(`/details/${req.params.id}`);
});

module.exports = bookController;