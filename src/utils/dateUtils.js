import dayjs from 'dayjs';

export const getDueDate = (borrowedAt) => {
  return dayjs(borrowedAt).add(14, 'day').toDate();
};

export const calculateOverdueDays = (dueDate) => {
  const now = dayjs();
  const due = dayjs(dueDate);

  if (now.isBefore(due)) return 0;

  return now.diff(due, 'day');
};
