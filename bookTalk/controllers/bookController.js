const { hasUser } = require('../middlewares/guards');
const { getBookById, getAllBooks, createBookReview } = require('../services/bookService');
const { parseError } = require('../util/parser');

const bookController = require('express').Router();

bookController.get('/create', hasUser(), (req, res) => {
    res.render('books/create', {
        title: 'Book Create'
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
    };
    const userId = req?.user._id;

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
        books
    })
})

bookController.get('/details/:id', async (req, res) => {
    const bookId = req.params.id;
    const userId = req.user?.id;
    const book = await getBookById(bookId);
    const wishedBook = book.wishList.some((id) => id == userId);

    if (book?.owner == userId) {
        book.isOwner = true;
    } else if (wishedBook) {
        book.isWished = true
    }

    res.render('books/details', {
        title: 'Book Details',
        book
    });
});

module.exports = bookController;