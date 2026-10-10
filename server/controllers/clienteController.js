const mongoose = require('mongoose');
const Cliente = require('../models/Cliente');

const listarClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find({ activo: true }).sort({ 'name.lastname': 1 });
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar clientes', error: error.message });
  }
};

const obtenerCliente = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    const cliente = await Cliente.findOne({ _id: id, activo: true });
    if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el cliente', error: error.message });
  }
};

const crearCliente = async (req, res) => {
  try {
    const { name, address, phone, username, email, password } = req.body;
    const cliente = await Cliente.create({ name, address, phone, username, email, password });
    res.status(201).json(cliente);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ mensaje: 'Ya existe un cliente con ese email o usuario' });
    }
    res.status(400).json({ mensaje: 'Datos inválidos', error: error.message });
  }
};
const eliminarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    const cliente = await Cliente.findOneAndUpdate(
      { _id: id, activo: true },
      { activo: false },
      { new: true }
    );
    if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    res.json({ mensaje: 'Cliente eliminado', id: cliente.id });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el cliente', error: error.message });
  }
};

module.exports = { listarClientes, obtenerCliente, crearCliente, eliminarCliente };