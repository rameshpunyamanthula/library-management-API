import { Fine } from '../models/index.js';

export const payFine = async (req, res) => {
  const fine = await Fine.findByPk(req.params.id);
  if (!fine) return res.status(404).json({ message: 'Fine not found' });

  fine.paid_at = new Date();
  await fine.save();

  res.json({ message: 'Fine paid successfully' });
};
