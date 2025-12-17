import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { TRANSACTION_STATUS } from '../utils/enums.js';

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  borrowed_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  returned_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM(...Object.values(TRANSACTION_STATUS)),
    defaultValue: TRANSACTION_STATUS.ACTIVE
  }
}, {
  tableName: 'transactions'
});

export default Transaction;
