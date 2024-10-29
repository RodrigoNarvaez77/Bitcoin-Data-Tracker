const mockData = {
    "Realtime Currency Exchange Rate": {
        "5. Exchange Rate": "67487.16000000"
    }
};

async function capturar(){
    const precio_actual = document.getElementById("current-price");
    const moneda = document.getElementById("Moneda");
    // Clave para almacenar el último precio en el almacenamiento local
      const lastPriceKey = 'lastPrice';

    try{
        const response = await fetch(`/api/data/coin`);
        const data = await response.json();
        //const data = mockData;//cambiar mañana a data
        console.log(data);

        const exchangeRateString = data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
        console.log(exchangeRateString);
        const monedaapi = data["Realtime Currency Exchange Rate"]["4. To_Currency Name"].trim();
        console.log("Valor de '5. Exchange Rate':", exchangeRateString); // Ver el valor específico
        console.log("El tipo de moneda es: ", monedaapi);
        precio_actual.innerHTML = parseFloat(exchangeRateString).toFixed(2);
        moneda.innerHTML = monedaapi;

    }catch(error){
        console.error(error)
    }
}
capturar();