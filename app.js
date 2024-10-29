// Importar dependencias
const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const path = require('path');

// Configurar dotenv para manejar variables de entorno
dotenv.config();

// Crear una instancia de Express
const app = express();
const coinroutes = require('./routes/coinroutes'); 
const PORT = process.env.PORT || 3030;

// Middleware para parsear JSON
app.use(express.json());

// Middleware para servir archivos estáticos desde la carpeta View
app.use(express.static(path.join(__dirname, './views')));


// Usar el router
//app.use('/', router);
app.use('/api/data',coinroutes);


// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});