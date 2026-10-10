const express = require('express');
const {
  listarClientes,
  obtenerCliente,
  crearCliente,
  eliminarCliente
} = require('../controllers/clienteController');

const router = express.Router();

router.get('/', listarClientes); 
router.get('/:id', obtenerCliente);  
router.post('/', crearCliente);         
router.delete('/:id', eliminarCliente); 

module.exports = router;