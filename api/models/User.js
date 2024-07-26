const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'first_name',
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'last_name',
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: true, 
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = User;