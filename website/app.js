

const apiKey = 'YOUR_API_KEY'; // Get your API key from OpenWeatherMap

document.getElementById('generate').addEventListener('click', () => {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    getWeatherData(zipCode)
        .then((data) => {
            const { temperature } = data.main;
            const date = new Date().toLocaleDateString();

            document.getElementById('date').textContent = `Date: ${date}`;
            document.getElementById('temp').textContent = `Temperature: ${temperature}°C`;
            document.getElementById('content').textContent = `Feeling: ${feelings}`;
        })
        .catch((error) => {
            console.error('Error fetching weather data:', error);
        });
});

async function getWeatherData(zipCode) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;

    const response = await fetch(apiUrl);

    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Unable to fetch weather data.');
    }
}
