async function historicos(){
    const table = document.getElementById("historical-data-body");
    const variacion24horas = document.getElementById("price-change");
    try{
        const response = await fetch(`/api/data/coin/historical`);
        const data = await response.json();
        console.log(data);

        const timeSeries = data["Time Series (Digital Currency Daily)"];
        const fechas = Object.keys(timeSeries);//toma la clave. 

        const closeToday = parseFloat(timeSeries[fechas[0]]["4. close"]);
        const closeYesterday = parseFloat(timeSeries[fechas[1]]["4. close"]);
        console.log("el dia de ayer el precio de cierre es: ",closeYesterday);
        // Calcula la variación porcentual
        const variacion = ((closeToday - closeYesterday) / closeYesterday) * 100;

        // Muestra la variación
        console.log("Variación 24h:", variacion.toFixed(2) + "%");
        variacion24horas.innerHTML = (variacion.toFixed(2) + "%");
        
        table.innerHTML = '';
        fechas.forEach(fecha => {
            const item = timeSeries[fecha]; // Obtiene el objeto de cada fecha.
            const row = document.createElement('tr');
            const nuevasopciones = document.createElement('td');
            nuevasopciones.textContent = `${fecha}`
            row.appendChild(nuevasopciones);

            const opcioncierre = document.createElement('td');
            opcioncierre.textContent = `${parseFloat(item["4. close"]).toFixed(2)}`;
            row.appendChild(opcioncierre);
            table.appendChild(row);

        });
        
    }catch(error){
        console.error(error)
    }
}
historicos();