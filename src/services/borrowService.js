import sequelize from '../config/database.js';
import { Book, Transaction } from '../models/index.js';
import { BOOK_STATUS, TRANSACTION_STATUS } from '../utils/enums.js';
import { validateMemberCanBorrow } from './validationService.js';
import { getDueDate } from '../utils/dateUtils.js';

export const borrowBook = async (member, book) => {
  return await sequelize.transaction(async (t) => {
    // Availability check (unchanged logic)
    if (book.status !== BOOK_STATUS.AVAILABLE || book.available_copies <= 0) {
      const error = new Error('Book is not available for borrowing');
      error.statusCode = 409;
      throw error;
    }

    // Business rule validation (unchanged)
    await validateMemberCanBorrow(member);

    const borrowedAt = new Date();
    const dueDate = getDueDate(borrowedAt);

    // Create transaction
    const transaction = await Transaction.create(
      {
        member_id: member.id,
        book_id: book.id,
        borrowed_at: borrowedAt,
        due_date: dueDate,
        status: TRANSACTION_STATUS.ACTIVE
      },
      { transaction: t }
    );

    // Update book
    book.available_copies -= 1;
    if (book.available_copies === 0) {
      book.status = BOOK_STATUS.BORROWED;
    }

    await book.save({ transaction: t });

    return transaction;
  });
};
