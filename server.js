const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Conectar a MongoDB, porfa no uses mal mi url es de mi bd de mongo,te lo confio para tu tarea osva
mongoose.connect('mongodb+srv://luisfelipecruzesteban398:Denji1922@cluster0.xspoltc.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Definir el esquema del modelo en este caso a tu tienda, le puse shopy xd
const compraSchema = new mongoose.Schema({
  nombrecliente: String,
  cantidaddescuento: Number,
  nombreproducto: String,
  costoproducto: Number,
  cantidadqueadquiriste: Number,
  total: Number,
});

// Crear el modelo,le puse compra
const Compra = mongoose.model('Compra', compraSchema);

// Ruta para manejar la solicitud de guardar datos
app.post('/guardar-datos', async (req, res) => {
  try {
    const nuevaCompra = new Compra(req.body);
    await nuevaCompra.save();
    res.status(201).json({ mensaje: 'Datos guardados exitosamente' });
    console.log('Datos guardados:', req.body);
  } catch (error) {
    console.error('Error al guardar datos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Middleware para servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para manejar la solicitud de la página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar el servidor, pones en tu consola : node server.js y buscas en google o tu navegador: http://localhost:3000/
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
