import express from 'express';
import * as memberController from '../controllers/memberController.js';

const router = express.Router();

router.post('/', memberController.createMember);
router.get('/', memberController.getMembers);
router.get('/:id', memberController.getMemberById);
router.put('/:id', memberController.updateMember);
router.delete('/:id', memberController.deleteMember);
router.get('/:id/borrowed', memberController.getBorrowedBooksByMember);

export default router;

