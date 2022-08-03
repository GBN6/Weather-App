import {
  requestForecastUrl,
  getForecast,
  requestCityUrl,
  getCoord,
  weatherDate,
  weatherTime,
} from './weatherApi';
import { renderWeatherData, renderWeatherDetails, renderDailyWeatherForecast } from './dom';

const searchButton = document.querySelector('.btn');
const form = document.querySelector('.form');

searchButton.addEventListener('click', test);
form.addEventListener('submit', (e) => {
  e.preventDefault();
});

async function test() {
  const userInput = document.querySelector('.user-input');
  let cityUrl = requestCityUrl(userInput.value);
  let coords = await getCoord(cityUrl);
  let forcecastUrl = requestForecastUrl(coords, 'metric');
  let forecastWeather = await getForecast(forcecastUrl);
  forecastWeather.name = coords.name;
  forecastWeather.country = coords.country;
  renderWeatherData(forecastWeather, 'metric');
  renderWeatherDetails(forecastWeather, 'metric');
  renderDailyWeatherForecast(forecastWeather, 'metric');
  userInput.value = '';
}