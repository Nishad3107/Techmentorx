const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const beneficiaryController = require('../controllers/beneficiary.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

// All routes require authentication
router.use(authenticate);

router.get('/', beneficiaryController.getAllBeneficiaries);
router.get('/:id', beneficiaryController.getBeneficiaryById);

router.post('/',
  authorize(['admin', 'ngo_admin', 'ngo_staff']),
  [
    body('firstName').notEmpty().trim(),
    body('age').isInt({ min: 0 }),
    body('gender').isIn(['male', 'female', 'other', 'prefer_not_to_say']),
    body('city').notEmpty(),
    body('needCategory').isArray({ min: 1 })
  ],
  beneficiaryController.createBeneficiary
);

router.put('/:id',
  authorize(['admin', 'ngo_admin', 'ngo_staff']),
  beneficiaryController.updateBeneficiary
);

router.delete('/:id',
  authorize(['admin', 'ngo_admin']),
  beneficiaryController.deleteBeneficiary
);

module.exports = router;
