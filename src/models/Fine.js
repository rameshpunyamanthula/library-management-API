import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Fine = sequelize.define('Fine', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  paid_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'fines'
});

export default Fine;
