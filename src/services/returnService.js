import { Transaction, Book, Fine } from '../models/index.js';
import { BOOK_STATUS, TRANSACTION_STATUS } from '../utils/enums.js';
import { calculateOverdueDays } from '../utils/dateUtils.js';
import { FINE_PER_DAY } from '../utils/constants.js';

export const returnBook = async (transaction) => {
  if (transaction.status !== TRANSACTION_STATUS.ACTIVE) {
    throw new Error('Transaction is not active');
  }

  const returnedAt = new Date();
  const overdueDays = calculateOverdueDays(transaction.due_date);

  transaction.returned_at = returnedAt;
  transaction.status =
    overdueDays > 0 ? TRANSACTION_STATUS.OVERDUE : TRANSACTION_STATUS.RETURNED;

  await transaction.save();

  const book = await Book.findByPk(transaction.book_id);
  book.available_copies += 1;
  book.status = BOOK_STATUS.AVAILABLE;
  await book.save();

  if (overdueDays > 0) {
    await Fine.create({
      member_id: transaction.member_id,
      transaction_id: transaction.id,
      amount: overdueDays * FINE_PER_DAY
    });
  }

  return transaction;
};

