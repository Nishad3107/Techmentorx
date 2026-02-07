const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const ngoController = require('../controllers/ngo.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

// Public routes
router.get('/', ngoController.getAllNGOs);
router.get('/:id', ngoController.getNGOById);

// Protected routes
router.post('/',
  authenticate,
  authorize(['admin']),
  [
    body('name').notEmpty().trim(),
    body('email').isEmail().normalizeEmail(),
    body('phone').notEmpty(),
    body('registrationNumber').notEmpty(),
    body('city').notEmpty()
  ],
  ngoController.createNGO
);

router.put('/:id',
  authenticate,
  authorize(['admin', 'ngo_admin']),
  ngoController.updateNGO
);

router.delete('/:id',
  authenticate,
  authorize(['admin']),
  ngoController.deleteNGO
);

// Verify NGO
router.post('/:id/verify',
  authenticate,
  authorize(['admin']),
  ngoController.verifyNGO
);

module.exports = router;
