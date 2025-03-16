const apiKey = '17195bc1ccf70c661646be4a9f29e554'; // Replace with your API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');

searchBtn.addEventListener('click', () => {
  const city = cityInput.value;
  if (city) {
    fetchWeather(city);
  } else {
    alert('Please enter a city name');
  }
});

async function fetchWeather(city) {
  try {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    const data = await response.json();

    if (data.cod === '404') {
      weatherResult.innerHTML = 'City not found';
    } else {
      const weather = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
      `;
      weatherResult.innerHTML = weather;
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    weatherResult.innerHTML = 'An error occurred. Please try again.';
  }
}