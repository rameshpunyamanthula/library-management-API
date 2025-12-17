import { Book, Transaction } from '../models/index.js';
import { BOOK_STATUS, TRANSACTION_STATUS } from '../utils/enums.js';
import { validateMemberCanBorrow } from './validationService.js';
import { getDueDate } from '../utils/dateUtils.js';

export const borrowBook = async (member, book) => {
  if (book.status !== BOOK_STATUS.AVAILABLE || book.available_copies <= 0) {
    throw new Error('Book is not available for borrowing');
  }

  await validateMemberCanBorrow(member);

  const borrowedAt = new Date();
  const dueDate = getDueDate(borrowedAt);

  const transaction = await Transaction.create({
    member_id: member.id,
    book_id: book.id,
    borrowed_at: borrowedAt,
    due_date: dueDate,
    status: TRANSACTION_STATUS.ACTIVE
  });

  book.available_copies -= 1;
  if (book.available_copies === 0) {
    book.status = BOOK_STATUS.BORROWED;
  }
  await book.save();

  return transaction;
};

