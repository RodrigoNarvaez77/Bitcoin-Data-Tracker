const express = require('express');
const axios = require('axios');
const twilio = require('twilio');
const { checkBitcoinPrice } = require('../services/priceChecker');
const router = express.Router();
const apiKey = process.env.API_KEY;
const accountSid = process.env.API_SID;
const authToken = process.env.API_KEY_M;
const client = new twilio(accountSid, authToken);

// Endpoint valores de hoy
router.get('/coin', async (req, res) => {
    try {
      const response = await axios.get(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=USD&apikey=${apiKey}`, { 
        headers: {
          'x-api-key': apiKey // Incluye la API key en el encabezado
        }
        
      }); 
      res.status(200).json(response.data);
      //console.log(response);

    } catch (error) {
      console.error(error);
      res.status(500).send('Error al cargar datos de la API');
    }
  });

  //End point valores historicos
  router.get('/coin/historical', async (req, res) => {
    try {
      const response = await axios.get(`https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=USD&apikey=${apiKey}`, { 
        headers: {
          'x-api-key': apiKey // Incluye la API key en el encabezado
        }
        
      }); 
      res.status(200).json(response.data);
      console.log(response);

    } catch (error) {
      console.error(error);
      res.status(500).send('Error al cargar datos de la API');
    }
  });

// Ruta para enviar un mensaje
router.post('/coin/send-message', (req, res) => {
  const { to, body } = req.body; // Extraer datos del cuerpo de la solicitud

  client.messages.create({
      body: body,
      to: to, // Número de destino
      from: process.env.TWILIO_NUMBER // Tu número de Twilio
  })
  .then((message) => {
      console.log('Mensaje enviado: ' + message.sid);
      res.status(200).json({ message: 'Mensaje enviado', sid: message.sid });
  })
  .catch((error) => {
      console.error('Error al enviar el mensaje: ', error);
      res.status(500).json({ error: 'Error al enviar el mensaje' });
  });
});

// Iniciar la verificación de precios cada 24 Horas
setInterval(checkBitcoinPrice, 86400000);

module.exports = router;