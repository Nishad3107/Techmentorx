const NGO = require('./NGO.model');
const Beneficiary = require('./Beneficiary.model');
const Donation = require('./Donation.model');
const Distribution = require('./Distribution.model');
const User = require('./User.model');

// Define associations
NGO.hasMany(Beneficiary, { foreignKey: 'ngoId', as: 'beneficiaries' });
Beneficiary.belongsTo(NGO, { foreignKey: 'ngoId', as: 'ngo' });

NGO.hasMany(User, { foreignKey: 'ngoId', as: 'users' });
User.belongsTo(NGO, { foreignKey: 'ngoId', as: 'ngo' });

NGO.hasMany(Donation, { foreignKey: 'ngoId', as: 'donations' });
Donation.belongsTo(NGO, { foreignKey: 'ngoId', as: 'ngo' });

Beneficiary.hasMany(Distribution, { foreignKey: 'beneficiaryId', as: 'distributions' });
Distribution.belongsTo(Beneficiary, { foreignKey: 'beneficiaryId', as: 'beneficiary' });

NGO.hasMany(Distribution, { foreignKey: 'ngoId', as: 'distributions' });
Distribution.belongsTo(NGO, { foreignKey: 'ngoId', as: 'ngo' });

Donation.hasMany(Distribution, { foreignKey: 'donationId', as: 'distributions' });
Distribution.belongsTo(Donation, { foreignKey: 'donationId', as: 'donation' });

module.exports = {
  NGO,
  Beneficiary,
  Donation,
  Distribution,
  User
};
