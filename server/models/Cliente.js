const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ClienteSchema = new mongoose.Schema({
  name: {
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true }
  },
  address: {
    city: { type: String, trim: true }
  },
  phone: { type: String, trim: true },
  username: { type: String, required: true, unique: true, trim: true, lowercase: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 8 },
  empresa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empresa',
    required: false,
    index: true
  },
  activo: { type: Boolean, default: true }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      return ret;
    }
  }
});

// Hashear password antes de guardar (Ley 25.326)
ClienteSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Comparar password
ClienteSchema.methods.compararPassword = async function (passwordIngresada) {
  return await bcrypt.compare(passwordIngresada, this.password);
};

// Índice compuesto (solo si empresa está presente)
ClienteSchema.index({ empresa: 1, 'name.lastname': 1 });

module.exports = mongoose.model('Cliente', ClienteSchema);