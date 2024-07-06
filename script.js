document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your OpenWeatherMap API key

    const searchButton = document.getElementById('searchButton');
    const locationInput = document.getElementById('locationInput');
    const weatherInfo = document.getElementById('weatherInfo');

    searchButton.addEventListener('click', () => {
        const location = locationInput.value.trim();
        if (location) {
            fetchWeather(location);
        } else {
            alert('Please enter a location');
        }
    });

    function fetchWeather(location) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Display weather information
                displayWeather(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                weatherInfo.innerHTML = '<p>Weather data not available. Please try again.</p>';
            });
    }

    function displayWeather(data) {
        const { name, main, weather } = data;

        const weatherHTML = `
            <h2>${name}</h2>
            <p>Temperature: ${main.temp} °C</p>
            <p>Weather: ${weather[0].main}</p>
            <p>Description: ${weather[0].description}</p>
        `;

        weatherInfo.innerHTML = weatherHTML;
    }
});
