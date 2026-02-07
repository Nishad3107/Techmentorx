const { validationResult } = require('express-validator');
const { NGO } = require('../models');
const logger = require('../utils/logger');

exports.getAllNGOs = async (req, res) => {
  try {
    const { city, isVerified, page = 1, limit = 10 } = req.query;
    
    const where = {};
    if (city) where.city = city;
    if (isVerified !== undefined) where.isVerified = isVerified === 'true';
    where.isActive = true;

    const offset = (page - 1) * limit;

    const { count, rows } = await NGO.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [['createdAt', 'DESC']]
    });

    res.json({
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit),
      ngos: rows
    });
  } catch (error) {
    logger.error('Get all NGOs error:', error);
    res.status(500).json({ error: 'Failed to fetch NGOs' });
  }
};

exports.getNGOById = async (req, res) => {
  try {
    const { id } = req.params;
    const ngo = await NGO.findByPk(id);

    if (!ngo) {
      return res.status(404).json({ error: 'NGO not found' });
    }

    res.json(ngo);
  } catch (error) {
    logger.error('Get NGO by ID error:', error);
    res.status(500).json({ error: 'Failed to fetch NGO' });
  }
};

exports.createNGO = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const ngo = await NGO.create(req.body);
    logger.info(`NGO created: ${ngo.name}`);

    res.status(201).json({
      message: 'NGO created successfully',
      ngo
    });
  } catch (error) {
    logger.error('Create NGO error:', error);
    res.status(500).json({ error: 'Failed to create NGO' });
  }
};

exports.updateNGO = async (req, res) => {
  try {
    const { id } = req.params;
    const ngo = await NGO.findByPk(id);

    if (!ngo) {
      return res.status(404).json({ error: 'NGO not found' });
    }

    await ngo.update(req.body);
    logger.info(`NGO updated: ${ngo.name}`);

    res.json({
      message: 'NGO updated successfully',
      ngo
    });
  } catch (error) {
    logger.error('Update NGO error:', error);
    res.status(500).json({ error: 'Failed to update NGO' });
  }
};

exports.deleteNGO = async (req, res) => {
  try {
    const { id } = req.params;
    const ngo = await NGO.findByPk(id);

    if (!ngo) {
      return res.status(404).json({ error: 'NGO not found' });
    }

    // Soft delete
    await ngo.update({ isActive: false });
    logger.info(`NGO deactivated: ${ngo.name}`);

    res.json({ message: 'NGO deactivated successfully' });
  } catch (error) {
    logger.error('Delete NGO error:', error);
    res.status(500).json({ error: 'Failed to delete NGO' });
  }
};

exports.verifyNGO = async (req, res) => {
  try {
    const { id } = req.params;
    const ngo = await NGO.findByPk(id);

    if (!ngo) {
      return res.status(404).json({ error: 'NGO not found' });
    }

    await ngo.update({ isVerified: true });
    logger.info(`NGO verified: ${ngo.name}`);

    res.json({
      message: 'NGO verified successfully',
      ngo
    });
  } catch (error) {
    logger.error('Verify NGO error:', error);
    res.status(500).json({ error: 'Failed to verify NGO' });
  }
};
