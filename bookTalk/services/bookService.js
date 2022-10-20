const Book = require('../models/Book');

async function getAllBooks() {
    return await Book.find({}).lean();
}

module.exports = {
    getAllBooks,
}