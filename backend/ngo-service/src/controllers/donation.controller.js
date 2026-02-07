const { validationResult } = require('express-validator');
const { Donation, NGO } = require('../models');
const logger = require('../utils/logger');

exports.getAllDonations = async (req, res) => {
  try {
    const { ngoId, status, itemType, page = 1, limit = 10 } = req.query;
    
    const where = {};
    if (ngoId) where.ngoId = ngoId;
    if (status) where.status = status;
    if (itemType) where.itemType = itemType;

    const offset = (page - 1) * limit;

    const { count, rows } = await Donation.findAndCountAll({
      where,
      include: [{ model: NGO, as: 'ngo', attributes: ['id', 'name'] }],
      limit: parseInt(limit),
      offset,
      order: [['createdAt', 'DESC']]
    });

    res.json({
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit),
      donations: rows
    });
  } catch (error) {
    logger.error('Get all donations error:', error);
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
};

exports.getDonationById = async (req, res) => {
  try {
    const { id } = req.params;
    const donation = await Donation.findByPk(id, {
      include: [{ model: NGO, as: 'ngo' }]
    });

    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    res.json(donation);
  } catch (error) {
    logger.error('Get donation by ID error:', error);
    res.status(500).json({ error: 'Failed to fetch donation' });
  }
};

exports.getInventory = async (req, res) => {
  try {
    const { ngoId, itemType } = req.query;
    
    const where = { status: 'received' };
    if (ngoId) where.ngoId = ngoId;
    if (itemType) where.itemType = itemType;

    const inventory = await Donation.findAll({
      where,
      attributes: [
        'itemType',
        'itemName',
        'unit',
        [sequelize.fn('SUM', sequelize.col('quantity')), 'totalQuantity']
      ],
      group: ['itemType', 'itemName', 'unit']
    });

    res.json({ inventory });
  } catch (error) {
    logger.error('Get inventory error:', error);
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
};

exports.createDonation = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const donation = await Donation.create(req.body);
    logger.info(`Donation recorded: ${donation.itemName} x ${donation.quantity}`);

    res.status(201).json({
      message: 'Donation recorded successfully',
      donation
    });
  } catch (error) {
    logger.error('Create donation error:', error);
    res.status(500).json({ error: 'Failed to record donation' });
  }
};

exports.updateDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const donation = await Donation.findByPk(id);

    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    await donation.update(req.body);
    logger.info(`Donation updated: ${donation.id}`);

    res.json({
      message: 'Donation updated successfully',
      donation
    });
  } catch (error) {
    logger.error('Update donation error:', error);
    res.status(500).json({ error: 'Failed to update donation' });
  }
};
