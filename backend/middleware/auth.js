const jwt = require('jsonwebtoken');

// Verifica que el usuario haya iniciado sesión (token válido)
const verificarToken = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ mensaje: 'No autorizado: falta el token' });
  }

  try {
    const token = header.split(' ')[1];
    const datos = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = datos; // { id, rol, empresa }
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token inválido o vencido' });
  }
};

// Permite el acceso solo a ciertos roles (ej: 'gerencia')
const permitirRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.usuario.rol)) {
    return res.status(403).json({ mensaje: 'No tenés permiso para esta acción' });
  }
  next();
};

module.exports = { verificarToken, permitirRoles };