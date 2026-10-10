require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');

const Empresa = require('./models/Empresa');
const Usuario = require('./models/Usuario');
const Cliente = require('./models/Cliente');

const seed = async () => {
  try {
    await connectDB();

    console.log('⚠️  ADVERTENCIA: Este script borrará TODOS los datos de las colecciones.');
    console.log('   Presioná Ctrl+C para cancelar. Continuando en 5 segundos...');
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log('🗑️  Limpiando colecciones...');
    await Empresa.deleteMany();
    await Usuario.deleteMany();
    await Cliente.deleteMany();

    console.log('🏢 Creando empresa de prueba...');
    const empresa = await Empresa.create({
      nombre: 'Distribuidora Eléctrica Salta',
      cuit: '30712345678',
      emailContacto: 'contacto@electricasalta.com',
      plan: 'profesional'
    });

    console.log('👤 Creando usuario de prueba...');
    const usuario = await Usuario.create({
      nombre: 'Agustina Quispe',
      email: 'agustina@test.com',
      password: 'cotizanoa2026',
      rol: 'gerencia',
      empresa: empresa._id
    });

    console.log('👥 Creando clientes de prueba...');
    await Cliente.create([
      {
        name: { firstname: 'Juan', lastname: 'Pérez' },
        address: { street: 'Av. Belgrano', number: '123', city: 'Salta', zipcode: '4400' },
        phone: '3874001001',
        username: 'juanperez',
        email: 'juan@test.com',
        password: 'cliente123',
        empresa: empresa._id
      },
      {
        name: { firstname: 'María', lastname: 'López' },
        address: { street: 'San Martín', number: '456', city: 'Jujuy', zipcode: '4600' },
        phone: '3884002002',
        username: 'marialopez',
        email: 'maria@test.com',
        password: 'cliente123',
        empresa: empresa._id
      },
      {
        name: { firstname: 'Carlos', lastname: 'Gómez' },
        address: { street: 'Rivadavia', number: '789', city: 'Tucumán', zipcode: '4000' },
        phone: '3814003003',
        username: 'carlosgomez',
        email: 'carlos@test.com',
        password: 'cliente123',
        empresa: empresa._id
      }
    ]);

    console.log('✅ Datos de prueba cargados correctamente');
    console.log(`   - 1 Empresa: ${empresa.nombre}`);
    console.log(`   - 1 Usuario: ${usuario.email}`);
    console.log('   - 3 Clientes');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al cargar datos de prueba:', error.message);
    process.exit(1);
  }
};

seed();