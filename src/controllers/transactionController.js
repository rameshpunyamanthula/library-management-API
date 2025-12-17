import { Book, Member, Transaction } from '../models/index.js';
import { borrowBook } from '../services/borrowService.js';
import { returnBook } from '../services/returnService.js';
import { updateMemberStatusIfNeeded } from '../services/memberStatusService.js';
import { TRANSACTION_STATUS } from '../utils/enums.js';

export const borrow = async (req, res, next) => {
  try {
    const { member_id, book_id } = req.body;

    const member = await Member.findByPk(member_id);
    const book = await Book.findByPk(book_id);

    if (!member || !book) throw new Error('Invalid member or book');

    const transaction = await borrowBook(member, book);
    res.status(201).json(transaction);
  } catch (err) {
    next(err);
  }
};

export const returnBookHandler = async (req, res, next) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (!transaction) throw new Error('Transaction not found');

    const updatedTransaction = await returnBook(transaction);
    await updateMemberStatusIfNeeded(transaction.member_id);

    res.json(updatedTransaction);
  } catch (err) {
    next(err);
  }
};

export const getOverdueTransactions = async (req, res) => {
  const overdue = await Transaction.findAll({
    where: { status: TRANSACTION_STATUS.OVERDUE }
  });
  res.json(overdue);
};

