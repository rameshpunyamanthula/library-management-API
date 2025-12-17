import { Transaction, Fine } from '../models/index.js';
import { MAX_BORROW_LIMIT } from '../utils/constants.js';
import { MEMBER_STATUS } from '../utils/enums.js';

export const validateMemberCanBorrow = async (member) => {
  if (member.status === MEMBER_STATUS.SUSPENDED) {
    throw new Error('Member is suspended');
  }

  const activeBorrowings = await Transaction.count({
    where: {
      member_id: member.id,
      status: 'active'
    }
  });

  if (activeBorrowings >= MAX_BORROW_LIMIT) {
    throw new Error('Borrowing limit exceeded');
  }

  const unpaidFines = await Fine.count({
    where: {
      member_id: member.id,
      paid_at: null
    }
  });

  if (unpaidFines > 0) {
    throw new Error('Unpaid fines exist');
  }
};
