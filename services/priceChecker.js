const axios = require('axios');
const twilio = require('twilio');
const apiKey = process.env.API_KEY;
const accountSid = process.env.API_SID;
const authToken = process.env.API_KEY_M;
const client = new twilio(accountSid, authToken);
const fromNumber = process.env.TWILIO_NUMBER;
const alertNumber = process.env.ALERT_PHONE_NUMBER;

// Función para verificar el precio de Bitcoin
const checkBitcoinPrice = async () => {
    try {
        const response = await axios.get(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=USD&apikey=${apiKey}`);
        const price = parseFloat(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
        console.log("el precio es:",price);
        if (price < 60000) {
            await sendAlert(price);
        }
    } catch (error) {
        console.error('Error fetching Bitcoin price:', error);
    }
};

// Función para enviar un mensaje de alerta
const sendAlert = async (price) => {
    const messageBody = `Alerta: El precio de Bitcoin ha caído a ${price}.`;

    try {
        const message = await client.messages.create({
            body: messageBody,
            to: alertNumber,
            from: fromNumber
        });
        console.log('Mensaje enviado: ' + message.sid);
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
    }
};

// Exportar la función de verificación
module.exports = { checkBitcoinPrice };