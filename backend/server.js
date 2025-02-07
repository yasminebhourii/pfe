const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)

.then(() => console.log("MongoDB connecté"))
.catch(err => console.log(err));

// Routes
app.use('/api/users', userRoutes);

app.listen(process.env.PORT, () => console.log(`Serveur lancé sur http://localhost:${process.env.PORT}`));
