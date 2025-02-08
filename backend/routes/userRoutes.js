const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateSignup, validateLogin, handleValidationErrors } = require('../middleware/userValidation');

// Route pour l'inscription
router.post('/signup', validateSignup, handleValidationErrors, userController.signup);

// Route pour la connexion
router.post('/login', validateLogin, handleValidationErrors, userController.login);

module.exports = router;