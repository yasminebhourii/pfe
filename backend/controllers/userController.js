const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Vérifier si le champ "name" est fourni
        if (!name) {
            return res.status(400).json({ message: 'Le nom est requis' });
        }

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Cet utilisateur existe déjà' });
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        // Sauvegarder l'utilisateur dans la base de données
        await newUser.save();

        // Générer un token JWT
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(201).json({ message: 'Utilisateur créé avec succès', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
        }

        // Vérifier le mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
        }

        // Générer un token JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ message: 'Connexion réussie', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};