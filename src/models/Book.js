import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { BOOK_STATUS } from '../utils/enums.js';

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  isbn: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.ENUM(...Object.values(BOOK_STATUS)),
    defaultValue: BOOK_STATUS.AVAILABLE
  },
  total_copies: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  available_copies: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'books'
});

export default Book;
