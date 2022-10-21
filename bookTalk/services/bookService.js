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

async function deleteBook(id) {
    return await Book.findByIdAndDelete(id);
}

async function editBook(id, data) {
    const existing = await Book.findById(id);

    existing.title = data.title;
    existing.author = data.author;
    existing.genre = data.genre;
    existing.stars = data.stars;
    existing.imageUrl = data.imageUrl;
    existing.bookReview = data.bookReview;
    
    return existing.save();
}

module.exports = {
    getAllBooks,
    getBookById,
    createBookReview,
    wishBook,
    deleteBook,
    editBook,
}