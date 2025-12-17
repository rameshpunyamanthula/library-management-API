import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { MEMBER_STATUS } from '../utils/enums.js';

const Member = sequelize.define('Member', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  membership_number: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM(...Object.values(MEMBER_STATUS)),
    defaultValue: MEMBER_STATUS.ACTIVE
  }
}, {
  tableName: 'members'
});

export default Member;
