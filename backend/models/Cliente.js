const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  email: { type: String, lowercase: true, trim: true },
  telefono: { type: String, trim: true },
  direccion: { type: String, trim: true },
  tipo: { type: String, enum: ['electricista', 'instalador', 'constructora', 'casa_electricidad', 'otro'], default: 'otro' },
  empresa: { type: mongoose.Schema.Types.ObjectId, ref: 'Empresa', required: true, index: true },
  creadoPor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  activo: { type: Boolean, default: true }
}, { timestamps: true });

ClienteSchema.index({ empresa: 1, nombre: 1 });

module.exports = mongoose.model('Cliente', ClienteSchema);
