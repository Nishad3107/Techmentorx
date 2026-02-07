const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');

const Donation = sequelize.define('Donation', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  donorName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  donorEmail: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true
    }
  },
  donorPhone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  itemType: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Type of item donated: supplements, food, medicine, etc.'
  },
  itemName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Unit: kg, liters, pieces, boxes, etc.'
  },
  expiryDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  ngoId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'ngos',
      key: 'id'
    },
    comment: 'NGO receiving the donation, null if going to central inventory'
  },
  status: {
    type: DataTypes.ENUM('pending', 'received', 'distributed', 'expired'),
    defaultValue: 'pending'
  },
  receivedDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'donations',
  timestamps: true,
  indexes: [
    { fields: ['ngoId'] },
    { fields: ['status'] },
    { fields: ['itemType'] },
    { fields: ['expiryDate'] }
  ]
});

module.exports = Donation;
