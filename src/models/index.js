import sequelize from '../config/database.js';
import Book from './Book.js';
import Member from './Member.js';
import Transaction from './Transaction.js';
import Fine from './Fine.js';

// Relationships
Book.hasMany(Transaction, { foreignKey: 'book_id' });
Transaction.belongsTo(Book, { foreignKey: 'book_id' });

Member.hasMany(Transaction, { foreignKey: 'member_id' });
Transaction.belongsTo(Member, { foreignKey: 'member_id' });

Member.hasMany(Fine, { foreignKey: 'member_id' });
Fine.belongsTo(Member, { foreignKey: 'member_id' });

Transaction.hasOne(Fine, { foreignKey: 'transaction_id' });
Fine.belongsTo(Transaction, { foreignKey: 'transaction_id' });

export {
  sequelize,
  Book,
  Member,
  Transaction,
  Fine
};
