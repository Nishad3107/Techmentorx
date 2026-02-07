const { validationResult } = require('express-validator');
const { Distribution, Beneficiary, NGO, Donation } = require('../models');
const logger = require('../utils/logger');
const distributionAlgorithm = require('../services/distribution.service');

exports.calculateDistribution = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { itemType, totalQuantity, city, ngoId } = req.body;

    // Get eligible beneficiaries
    const where = { isActive: true };
    if (city) where.city = city;
    if (ngoId) where.ngoId = ngoId;

    const beneficiaries = await Beneficiary.findAll({
      where,
      include: [{ model: NGO, as: 'ngo' }],
      order: [['priorityLevel', 'DESC'], ['lastDistributionDate', 'ASC']]
    });

    // Calculate fair distribution
    const distributionPlan = await distributionAlgorithm.calculateFairDistribution(
      beneficiaries,
      itemType,
      totalQuantity
    );

    res.json({
      message: 'Distribution calculated successfully',
      plan: distributionPlan,
      summary: {
        totalBeneficiaries: beneficiaries.length,
        totalQuantity,
        averagePerBeneficiary: totalQuantity / beneficiaries.length
      }
    });
  } catch (error) {
    logger.error('Calculate distribution error:', error);
    res.status(500).json({ error: 'Failed to calculate distribution' });
  }
};

exports.executeDistribution = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { distributions } = req.body;
    const userId = req.user.userId;

    const createdDistributions = [];

    for (const dist of distributions) {
      const distribution = await Distribution.create({
        ...dist,
        distributedBy: userId,
        distributionDate: new Date()
      });

      // Update beneficiary's last distribution date
      await Beneficiary.update(
        { lastDistributionDate: new Date() },
        { where: { id: dist.beneficiaryId } }
      );

      createdDistributions.push(distribution);
    }

    logger.info(`Distribution executed: ${createdDistributions.length} distributions`);

    res.status(201).json({
      message: 'Distribution executed successfully',
      distributions: createdDistributions
    });
  } catch (error) {
    logger.error('Execute distribution error:', error);
    res.status(500).json({ error: 'Failed to execute distribution' });
  }
};

exports.getDistributionHistory = async (req, res) => {
  try {
    const { ngoId, beneficiaryId, startDate, endDate, page = 1, limit = 10 } = req.query;
    
    const where = {};
    if (ngoId) where.ngoId = ngoId;
    if (beneficiaryId) where.beneficiaryId = beneficiaryId;
    if (startDate && endDate) {
      where.distributionDate = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await Distribution.findAndCountAll({
      where,
      include: [
        { model: Beneficiary, as: 'beneficiary' },
        { model: NGO, as: 'ngo', attributes: ['id', 'name'] }
      ],
      limit: parseInt(limit),
      offset,
      order: [['distributionDate', 'DESC']]
    });

    res.json({
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit),
      distributions: rows
    });
  } catch (error) {
    logger.error('Get distribution history error:', error);
    res.status(500).json({ error: 'Failed to fetch distribution history' });
  }
};
