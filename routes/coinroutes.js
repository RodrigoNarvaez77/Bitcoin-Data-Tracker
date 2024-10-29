const express = require('express');
const axios = require('axios');
const router = express.Router();
const apiKey = process.env.API_KEY;

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

module.exports = router;