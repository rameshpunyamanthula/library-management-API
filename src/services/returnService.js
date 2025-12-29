import sequelize from '../config/database.js';
import { Transaction, Book, Fine } from '../models/index.js';
import { BOOK_STATUS, TRANSACTION_STATUS } from '../utils/enums.js';
import { calculateOverdueDays } from '../utils/dateUtils.js';
import { FINE_PER_DAY } from '../utils/constants.js';

export const returnBook = async (transaction) => {
  return await sequelize.transaction(async (t) => {
    if (transaction.status !== TRANSACTION_STATUS.ACTIVE) {
      const error = new Error('Transaction is not active');
      error.statusCode = 409;
      throw error;
    }

    const returnedAt = new Date();
    const overdueDays = calculateOverdueDays(transaction.due_date);

    transaction.returned_at = returnedAt;
    transaction.status =
      overdueDays > 0
        ? TRANSACTION_STATUS.OVERDUE
        : TRANSACTION_STATUS.RETURNED;

    await transaction.save({ transaction: t });

    const book = await Book.findByPk(transaction.book_id, { transaction: t });
    book.available_copies += 1;
    book.status = BOOK_STATUS.AVAILABLE;

    await book.save({ transaction: t });

    if (overdueDays > 0) {
      await Fine.create(
        {
          member_id: transaction.member_id,
          transaction_id: transaction.id,
          amount: overdueDays * FINE_PER_DAY
        },
        { transaction: t }
      );
    }

    return transaction;
  });
};
