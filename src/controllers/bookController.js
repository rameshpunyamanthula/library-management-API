import { Book } from '../models/index.js';
import { BOOK_STATUS } from '../utils/enums.js';

export const createBook = async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
};

export const getBooks = async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
};

export const getBookById = async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
};

export const updateBook = async (req, res) => {
  await Book.update(req.body, { where: { id: req.params.id } });
  res.json({ message: 'Book updated' });
};

export const deleteBook = async (req, res) => {
  await Book.destroy({ where: { id: req.params.id } });
  res.json({ message: 'Book deleted' });
};

export const getAvailableBooks = async (req, res) => {
  const books = await Book.findAll({
    where: { status: BOOK_STATUS.AVAILABLE }
  });
  res.json(books);
};

