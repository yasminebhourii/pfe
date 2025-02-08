const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import des routes
const authRoutes = require('./routes/authRoute');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connecté"))
.catch(err => console.error("Erreur de connexion à MongoDB :", err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Middleware pour gérer les erreurs globales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Quelque chose a mal tourné !' });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur lancé sur http://localhost:${PORT}`));