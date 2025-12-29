import './bootstrap.js';   // <-- FIRST, no imports before this

import app from './src/app.js';
import { sequelize } from './src/models/index.js';


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Library API running on port ${PORT}`);
});


sequelize.sync({ alter: true })
  .then(() => console.log('Database synced'))
  .catch(err => console.error(err));
