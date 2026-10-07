require('dotenv').config();
const mongoose = require('mongoose');
const Empresa = require('../models/Empresa');
const Usuario = require('../models/Usuario');

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  let empresa = await Empresa.findOne({ cuit: '30-00000000-0' });
  if (!empresa) {
    empresa = await Empresa.create({
      nombre: 'PyME Demo NOA',
      cuit: '30-00000000-0',
      emailContacto: 'demo@cotizanoa.com'
    });
  }

  const usuarios = [
    { nombre: 'Gerente Demo', email: 'gerencia@cotizanoa.com', password: 'gerencia123', rol: 'gerencia' },
    { nombre: 'Soporte Demo', email: 'soporte@cotizanoa.com', password: 'soporte123', rol: 'soporte' }
  ];

  for (const datos of usuarios) {
    const existe = await Usuario.findOne({ email: datos.email });
    if (!existe) await Usuario.create({ ...datos, empresa: empresa._id });
  }

  console.log('Datos de prueba listos');
  await mongoose.disconnect();
};

seed().catch((error) => {
  console.error('Error en el seed:', error.message);
  process.exit(1);
});