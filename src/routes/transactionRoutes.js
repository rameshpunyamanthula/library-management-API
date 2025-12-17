import express from 'express';
import {
  borrow,
  returnBookHandler,
  getOverdueTransactions
} from '../controllers/transactionController.js';

const router = express.Router();

router.post('/borrow', borrow);
router.post('/:id/return', returnBookHandler);
router.get('/overdue', getOverdueTransactions);

export default router;
