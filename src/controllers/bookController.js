
import { createBookSchema } from '../validators/bookValidator.js';

import { Book } from '../models/index.js';
import { BOOK_STATUS } from '../utils/enums.js';

export const createBook = async (req, res, next) => {
  try {
    const { error } = createBookSchema.validate(req.body);

    if (error) {
      const err = new Error(error.details[0].message);
      err.statusCode = 400;
      throw err;
    }

    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
};

export const getBooks = async (req, res, next) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
};

export const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);

    if (!book) {
      const error = new Error('Book not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
};

export const updateBook = async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);

    if (!book) {
      const error = new Error('Book not found');
      error.statusCode = 404;
      throw error;
    }

    await book.update(req.body);
    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);

    if (!book) {
      const error = new Error('Book not found');
      error.statusCode = 404;
      throw error;
    }

    await book.destroy();
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    next(err);
  }
};

export const getAvailableBooks = async (req, res, next) => {
  try {
    const books = await Book.findAll({
      where: { status: BOOK_STATUS.AVAILABLE }
    });

    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
};

