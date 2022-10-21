const Book = require('../models/Book');

async function getAllBooks() {
    return await Book.find({}).lean();
}

async function getBookById(id) {
    return await Book.findById(id).lean();
}

async function createBookReview(book) {
    return Book.create(book)
}

async function wishBook(bookId, userId) {
    const book = await Book.findById(bookId);
    book.wishList.push(userId);
    await book.save();
}

module.exports = {
    getAllBooks,
    getBookById,
    createBookReview,
    wishBook,
}