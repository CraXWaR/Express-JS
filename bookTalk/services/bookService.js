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

module.exports = {
    getAllBooks,
    getBookById,
    createBookReview,

}