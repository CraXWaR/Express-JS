const { hasUser } = require('../middlewares/guards');
const { getBookById, getAllBooks, createBookReview, wishBook, editBook, deleteBook } = require('../services/bookService');
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

    book.isOwner = book.owner.toString() == req.user?._id.toString();
    book.isWished = book.wishList.some((id) => id == req.user?._id);

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

bookController.get('/details/:id/edit', async (req, res) => {
    const book = await getBookById(req.params.id);

    if (book.owner.toString() != req.user._id.toString()) {
        return res.redirect('/auth/login');
    }

    res.render('books/edit', {
        title: 'Edit book',
        user: req.user,
        book
    })
});

bookController.get('/details/:id/delete', async (req, res) => {
    const book = await getBookById(req.params.id);

    if (book.owner.toString() != req.user._id.toString()) {
        return res.redirect('/auth/login');
    }

    await deleteBook(req.params.id);
    res.redirect('/catalog');
})

bookController.post('/details/:id/edit', async (req, res) => {
    const book = await getBookById(req.params.id);
    
    if (book.owner.toString() != req.user._id.toString()) {
        return res.redirect('/auth/login');
    }

    try {
        await editBook(req.params.id, req.body);
        res.redirect(`/details/${req.params.id}`);
    } catch (error) {
        res.render('books/edit', {
            title: 'Edit book',
            user: req.user,
            errors: parseError(error),
            book: req.body
        })
    }
});

module.exports = bookController;