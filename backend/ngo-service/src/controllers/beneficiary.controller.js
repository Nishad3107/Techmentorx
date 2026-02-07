const { validationResult } = require('express-validator');
const { Beneficiary, NGO } = require('../models');
const logger = require('../utils/logger');

exports.getAllBeneficiaries = async (req, res) => {
  try {
    const { ngoId, city, priorityLevel, page = 1, limit = 10 } = req.query;
    
    const where = { isActive: true };
    if (ngoId) where.ngoId = ngoId;
    if (city) where.city = city;
    if (priorityLevel) where.priorityLevel = priorityLevel;

    const offset = (page - 1) * limit;

    const { count, rows } = await Beneficiary.findAndCountAll({
      where,
      include: [{ model: NGO, as: 'ngo', attributes: ['id', 'name'] }],
      limit: parseInt(limit),
      offset,
      order: [['priorityLevel', 'DESC'], ['createdAt', 'ASC']]
    });

    res.json({
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit),
      beneficiaries: rows
    });
  } catch (error) {
    logger.error('Get all beneficiaries error:', error);
    res.status(500).json({ error: 'Failed to fetch beneficiaries' });
  }
};

exports.getBeneficiaryById = async (req, res) => {
  try {
    const { id } = req.params;
    const beneficiary = await Beneficiary.findByPk(id, {
      include: [{ model: NGO, as: 'ngo' }]
    });

    if (!beneficiary) {
      return res.status(404).json({ error: 'Beneficiary not found' });
    }

    res.json(beneficiary);
  } catch (error) {
    logger.error('Get beneficiary by ID error:', error);
    res.status(500).json({ error: 'Failed to fetch beneficiary' });
  }
};

exports.createBeneficiary = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const beneficiary = await Beneficiary.create(req.body);
    logger.info(`Beneficiary created: ${beneficiary.firstName} ${beneficiary.lastName}`);

    res.status(201).json({
      message: 'Beneficiary registered successfully',
      beneficiary
    });
  } catch (error) {
    logger.error('Create beneficiary error:', error);
    res.status(500).json({ error: 'Failed to create beneficiary' });
  }
};

exports.updateBeneficiary = async (req, res) => {
  try {
    const { id } = req.params;
    const beneficiary = await Beneficiary.findByPk(id);

    if (!beneficiary) {
      return res.status(404).json({ error: 'Beneficiary not found' });
    }

    await beneficiary.update(req.body);
    logger.info(`Beneficiary updated: ${beneficiary.id}`);

    res.json({
      message: 'Beneficiary updated successfully',
      beneficiary
    });
  } catch (error) {
    logger.error('Update beneficiary error:', error);
    res.status(500).json({ error: 'Failed to update beneficiary' });
  }
};

exports.deleteBeneficiary = async (req, res) => {
  try {
    const { id } = req.params;
    const beneficiary = await Beneficiary.findByPk(id);

    if (!beneficiary) {
      return res.status(404).json({ error: 'Beneficiary not found' });
    }

    await beneficiary.update({ isActive: false });
    logger.info(`Beneficiary deactivated: ${beneficiary.id}`);

    res.json({ message: 'Beneficiary deactivated successfully' });
  } catch (error) {
    logger.error('Delete beneficiary error:', error);
    res.status(500).json({ error: 'Failed to delete beneficiary' });
  }
};
