import { Member, Transaction, Book } from '../models/index.js';
import { TRANSACTION_STATUS } from '../utils/enums.js';

export const createMember = async (req, res) => {
  const member = await Member.create(req.body);
  res.status(201).json(member);
};

export const getMembers = async (req, res) => {
  const members = await Member.findAll();
  res.json(members);
};

export const getMemberById = async (req, res) => {
  const member = await Member.findByPk(req.params.id);
  if (!member) return res.status(404).json({ message: 'Member not found' });
  res.json(member);
};

export const updateMember = async (req, res) => {
  await Member.update(req.body, { where: { id: req.params.id } });
  res.json({ message: 'Member updated' });
};

export const deleteMember = async (req, res) => {
  await Member.destroy({ where: { id: req.params.id } });
  res.json({ message: 'Member deleted' });
};

export const getBorrowedBooks = async (req, res) => {
  const transactions = await Transaction.findAll({
    where: {
      member_id: req.params.id,
      status: TRANSACTION_STATUS.ACTIVE
    },
    include: Book
  });
  res.json(transactions);
};

