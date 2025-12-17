import { Transaction, Member } from '../models/index.js';
import { MEMBER_STATUS, TRANSACTION_STATUS } from '../utils/enums.js';

export const updateMemberStatusIfNeeded = async (memberId) => {
  const overdueCount = await Transaction.count({
    where: {
      member_id: memberId,
      status: TRANSACTION_STATUS.OVERDUE
    }
  });

  if (overdueCount >= 3) {
    await Member.update(
      { status: MEMBER_STATUS.SUSPENDED },
      { where: { id: memberId } }
    );
  }
};

