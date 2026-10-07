const Cliente = require('../models/Cliente');

// GET /api/clientes  → lista los clientes de la empresa del usuario
const listarClientes = async (req, res) => {
  try {
    const filtro = { empresa: req.usuario.empresa, activo: true };

    if (req.query.tipo) filtro.tipo = req.query.tipo;
    if (req.query.buscar) filtro.nombre = { $regex: req.query.buscar, $options: 'i' };

    const clientes = await Cliente.find(filtro).sort({ nombre: 1 });
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar clientes', error: error.message });
  }
};

// GET /api/clientes/:id  → detalle de un cliente
const obtenerCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findOne({ _id: req.params.id, empresa: req.usuario.empresa, activo: true });
    if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (error) {
    res.status(400).json({ mensaje: 'ID inválido', error: error.message });
  }
};

// POST /api/clientes  → alta de un cliente
const crearCliente = async (req, res) => {
  try {
    const { nombre, email, telefono, direccion, tipo } = req.body;
    const cliente = await Cliente.create({
      nombre, email, telefono, direccion, tipo,
      empresa: req.usuario.empresa,
      creadoPor: req.usuario.id
    });
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ mensaje: 'Datos inválidos', error: error.message });
  }
};

// PUT /api/clientes/:id  → modificar un cliente
const actualizarCliente = async (req, res) => {
  try {
    const { nombre, email, telefono, direccion, tipo } = req.body;
    const cliente = await Cliente.findOneAndUpdate(
      { _id: req.params.id, empresa: req.usuario.empresa, activo: true },
      { nombre, email, telefono, direccion, tipo },
      { new: true, runValidators: true }
    );
    if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (error) {
    res.status(400).json({ mensaje: 'Datos inválidos', error: error.message });
  }
};

// DELETE /api/clientes/:id  → baja lógica (no se borra, se desactiva)
const eliminarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findOneAndUpdate(
      { _id: req.params.id, empresa: req.usuario.empresa, activo: true },
      { activo: false },
      { new: true }
    );
    if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    res.json({ mensaje: 'Cliente dado de baja', cliente });
  } catch (error) {
    res.status(400).json({ mensaje: 'ID inválido', error: error.message });
  }
};

module.exports = { listarClientes, obtenerCliente, crearCliente, actualizarCliente, eliminarCliente };