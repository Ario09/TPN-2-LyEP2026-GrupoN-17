const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ mensaje: 'Email y contraseña son obligatorios' });
    }

    const usuario = await Usuario.findOne({ email: email.toLowerCase(), activo: true }).select('+password');

    if (!usuario || !(await usuario.compararPassword(password))) {
      return res.status(401).json({ mensaje: 'Email o contraseña incorrectos' });
    }

    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol, empresa: usuario.empresa },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      token,
      usuario: { id: usuario._id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol }
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
  }
};

module.exports = { login };