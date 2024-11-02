async function historicos(){
    const table = document.getElementById("historical-data-body");
    const variacion24horas = document.getElementById("price-change");
    const ctx = document.getElementById('miGrafico').getContext('2d');
    const labels = [];
    const dataPoints = [];
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

             // Agrega datos para el gráfico
             labels.push(fecha);
             dataPoints.push(parseFloat(item["4. close"]).toFixed(2));


        });

        //grafico analisis de datos
        const miGrafico = new Chart(ctx, {
            type: 'line', // Cambia a 'line' o 'pie' según lo que necesites
            data: {
                labels: labels, // Etiquetas de tus datos
                datasets: [{
                    label: 'Precio de Ciere',
                    data: dataPoints, // Tus datos aquí
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
 
    }catch(error){
        console.error(error)
    }
}
historicos();