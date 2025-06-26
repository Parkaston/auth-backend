require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
// Middleware para leer JSON
app.use(express.json());

// Conexión a MongoDB
connectDB();

// Rutas
app.use('/api', authRoutes);

// Exportamos la app para usarla en el index y en los tests
module.exports = app;
