const { body, validationResult } = require('express-validator');

exports.validateSignup = [
    body('name').notEmpty().withMessage('Le nom est requis'),
    body('email').isEmail().withMessage('L\'email doit être valide'),
    body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
];

exports.validateLogin = [
    body('email').isEmail().withMessage('L\'email doit être valide'),
    body('password').notEmpty().withMessage('Le mot de passe est requis'),
];

exports.handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};