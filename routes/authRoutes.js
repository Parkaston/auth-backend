const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');


// Ruta para registrar usuarios
router.post('/register', register);


//Ruta para iniciar sesiones
router.post('/login', login);


// Agregamos la ruta para obtener la informacion del perfil del usuario, pero en este caso
// solo permitimos el acceso si el usuario tiene un token válido
router.get('/profile', authMiddleware, getProfile);


//Agregamos la ruta protegida necesaria para actualizar el perfil del user
router.put('/profile', authMiddleware, updateProfile);

module.exports = router;
