import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'library_db',      // database name
  'postgres',        // username
  'Rami@4263',        // password ← change if yours is different
  {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: false
  }
);

export default sequelize;
