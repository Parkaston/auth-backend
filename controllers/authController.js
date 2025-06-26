const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Validación básica
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Intentamos crear el usuario directamente
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado con éxito' });

  } catch (error) {
    console.error('Error al registrar usuario:', error);

    // Si el error es de índice duplicado
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0]; 

      const message = field === 'email'
        ? 'El correo ya está en uso'
        : 'El nombre de usuario ya está en uso';

      return res.status(409).json({ message });
    }

    res.status(500).json({ message: 'Error en el servidor' });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validar campos
    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
    }

    // Buscar al usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Devolver token
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error en login:', error.message);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

// Middleware para la obtencion del perfil del user
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ user }); // devolvemos un objeto con el user
  } catch (error) {
    console.error('Error al obtener perfil:', error.message);
    res.status(500).json({ message: 'Error al obtener el perfil' });
  }
};


//Ahora necesitariamos el controlador para actualizar un perfil

const updateProfile = async (req, res) => {
  const { username, email, description } = req.body; 

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualizamos solo si hay cambios
    if (username) user.username = username;
    if (email) user.email = email;
    if (description !== undefined) user.description = description; 

    await user.save();

    res.json({
      message: 'Perfil actualizado correctamente',
      user: {
        username: user.username,
        email: user.email,
        description: user.description, 
      },
    });
  } catch (error) {
    console.error('Error al actualizar perfil:', error.message);
    res.status(500).json({ message: 'Error al actualizar perfil' });
  }
};



module.exports = {
  register,
  login,
  getProfile,
  updateProfile
};
