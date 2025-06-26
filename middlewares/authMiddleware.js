const jwt = require('jsonwebtoken');


//Creamos un middleware que permite al usuario ver su perfil unicamente si tiene un token válido.

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verificamos si existe el header Authorization en el body de la petición
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verificamos y decodificamos el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guardamos los datos decodificados en req.user
    next(); // Permitimos el acceso
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

module.exports = authMiddleware;
