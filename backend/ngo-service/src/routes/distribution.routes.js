const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const distributionController = require('../controllers/distribution.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

router.use(authenticate);

router.get('/history', distributionController.getDistributionHistory);

router.post('/calculate',
  authorize(['admin', 'ngo_admin']),
  [
    body('itemType').notEmpty(),
    body('totalQuantity').isInt({ min: 1 })
  ],
  distributionController.calculateDistribution
);

router.post('/execute',
  authorize(['admin', 'ngo_admin', 'ngo_staff']),
  [
    body('distributions').isArray({ min: 1 })
  ],
  distributionController.executeDistribution
);

module.exports = router;
