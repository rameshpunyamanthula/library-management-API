import { Member, Transaction, Book } from '../models/index.js';
import { TRANSACTION_STATUS } from '../utils/enums.js';
import { createMemberSchema } from '../validators/memberValidator.js';


export const createMember = async (req, res, next) => {
  try {
    const { error } = createMemberSchema.validate(req.body);

    if (error) {
      const err = new Error(error.details[0].message);
      err.statusCode = 400;
      throw err;
    }

    const member = await Member.create(req.body);
    res.status(201).json(member);
  } catch (err) {
    next(err);
  }
};


export const getMembers = async (req, res, next) => {
  try {
    const members = await Member.findAll();
    res.status(200).json(members);
  } catch (err) {
    next(err);
  }
};

export const getMemberById = async (req, res, next) => {
  try {
    const member = await Member.findByPk(req.params.id);

    if (!member) {
      const error = new Error('Member not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(member);
  } catch (err) {
    next(err);
  }
};

export const updateMember = async (req, res, next) => {
  try {
    const member = await Member.findByPk(req.params.id);

    if (!member) {
      const error = new Error('Member not found');
      error.statusCode = 404;
      throw error;
    }

    await member.update(req.body);
    res.status(200).json(member);
  } catch (err) {
    next(err);
  }
};

export const deleteMember = async (req, res, next) => {
  try {
    const member = await Member.findByPk(req.params.id);

    if (!member) {
      const error = new Error('Member not found');
      error.statusCode = 404;
      throw error;
    }

    await member.destroy();
    res.status(200).json({ message: 'Member deleted successfully' });
  } catch (err) {
    next(err);
  }
};

export const getBorrowedBooksByMember = async (req, res, next) => {
  try {
    const member = await Member.findByPk(req.params.id);

    if (!member) {
      const error = new Error('Member not found');
      error.statusCode = 404;
      throw error;
    }

    const transactions = await Transaction.findAll({
      where: {
        member_id: req.params.id,
        status: TRANSACTION_STATUS.ACTIVE
      },
      include: [Book]
    });

    res.status(200).json(transactions);
  } catch (err) {
    next(err);
  }
};
