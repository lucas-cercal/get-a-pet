const router = require('express').Router();

const PetController = require('../controllers/PetController');

// Midlewares
const verifyToken = require('../helpers/verify-token');

router.post('/create', verifyToken, PetController.create);

module.exports = router;    