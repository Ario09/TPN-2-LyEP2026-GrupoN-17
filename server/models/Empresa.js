const mongoose = require('mongoose');

const EmpresaSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  cuit: { type: String, required: true, unique: true },
  emailContacto: { type: String, required: true, lowercase: true },
  plan: { type: String, enum: ['basico', 'profesional', 'premium'], default: 'basico' },
  activa: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Empresa', EmpresaSchema);
