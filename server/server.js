require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// CORS: en local usa el frontend de Vite; en producción, la URL definida en CLIENT_URL
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

// Conectar a MongoDB
connectDB();

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'Backend Panel de Control de Clientes funcionando' });
});
// Rutas de la API de clientes
app.use('/api/clientes', require('./routes/clienteRoutes'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('Servidor corriendo en http://localhost:' + PORT);
});