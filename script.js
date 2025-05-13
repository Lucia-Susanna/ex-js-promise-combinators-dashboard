const baseUrl = "https://boolean-spec-frontend.vercel.app/freetestapi";
async function getDashboardData(query) {
    try {
        const [destRes, weatherRes, airportRes] = await Promise.all([
            fetch(`${baseUrl}/destinations?search=${query}`),
            fetch(`${baseUrl}/weathers?search=${query}`),
            fetch(`${baseUrl}/airports?search=${query}`)
        ]);

        const [destData, weatherData, airportData] = await Promise.all([
            destRes.json(),
            weatherRes.json(),
            airportRes.json()
        ]);

        // 🔍 DEBUG: Controlla cosa arriva
        console.log("Destination data:", destData);
        console.log("Weather data:", weatherData);
        console.log("Airport data:", airportData);

        const destination = destData[0];
        const weather = weatherData[0];
        const airport = airportData[0];

        const dashboardData = {
            city: destination?.name,
            country: destination?.country,
            temperature: weather?.temperature,
            weather: weather?.weather_description,
            airport: airport?.name
        };

        return dashboardData;

    } catch (error) {
        console.error("Errore durante il recupero dei dati:", error);
        throw error;
    }
}


getDashboardData('London')
    .then(data => {
        console.log('Dashboard data:', data);
        console.log(
            `${data.city} is in ${data.country}.\n` +
            `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n` +
            `The main airport is ${data.airport}.\n`
        );
    })
    .catch(error => console.error(error));

