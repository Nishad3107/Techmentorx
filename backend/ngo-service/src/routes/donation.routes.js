const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const donationController = require('../controllers/donation.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

router.use(authenticate);

router.get('/', donationController.getAllDonations);
router.get('/inventory', donationController.getInventory);
router.get('/:id', donationController.getDonationById);

router.post('/',
  authorize(['admin', 'ngo_admin', 'ngo_staff']),
  [
    body('donorName').notEmpty().trim(),
    body('itemType').notEmpty(),
    body('itemName').notEmpty(),
    body('quantity').isInt({ min: 1 }),
    body('unit').notEmpty()
  ],
  donationController.createDonation
);

router.put('/:id',
  authorize(['admin', 'ngo_admin', 'ngo_staff']),
  donationController.updateDonation
);

module.exports = router;
