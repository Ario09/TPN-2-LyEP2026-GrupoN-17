const express = require('express');
const { verificarToken, permitirRoles } = require('../middleware/auth');
const {
  listarClientes, obtenerCliente, crearCliente, actualizarCliente, eliminarCliente
} = require('../controllers/clienteController');
const router = express.Router();
router.use(verificarToken);

router.get('/', listarClientes);
router.get('/:id', obtenerCliente);
router.post('/', crearCliente);
router.put('/:id', actualizarCliente);
router.delete('/:id', permitirRoles('gerencia'), eliminarCliente); // solo Gerencia da de baja

module.exports = router;