require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.json({ mensaje: 'Backend CotizaNOA funcionando' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('Servidor corriendo en http://localhost:' + PORT);
});
