const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');

const Distribution = sequelize.define('Distribution', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  beneficiaryId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'beneficiaries',
      key: 'id'
    }
  },
  ngoId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'ngos',
      key: 'id'
    }
  },
  donationId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'donations',
      key: 'id'
    }
  },
  itemType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  itemName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantity: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false
  },
  distributionDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  distributedBy: {
    type: DataTypes.UUID,
    allowNull: true,
    comment: 'User ID of the person who distributed'
  },
  fairnessScore: {
    type: DataTypes.DECIMAL(3, 2),
    allowNull: true,
    comment: 'Score indicating fairness of this distribution (0-1)'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'distributions',
  timestamps: true,
  indexes: [
    { fields: ['beneficiaryId'] },
    { fields: ['ngoId'] },
    { fields: ['distributionDate'] }
  ]
});

module.exports = Distribution;
