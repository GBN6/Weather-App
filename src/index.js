import {
  requestForecastUrl,
  getForecast,
  requestCityUrl,
  getCoord,
  weatherDate,
  weatherTime,
} from './weatherApi';
import {
  renderWeatherData,
  renderWeatherDetails,
  renderDailyWeatherForecast,
} from './dom';

const searchButton = document.querySelector('.btn');
const form = document.querySelector('.form');

searchButton.addEventListener('click', () => test(units));
form.addEventListener('submit', (e) => {
  e.preventDefault();
});

let units = 'metric';
let degreesToggle = false;
let lastCity = 'warsaw';

async function test(unit, firstLoad = false) {
  try {
    let city;

    if (firstLoad) {
      city = 'warsaw';
    } else {
      const userInput = document.querySelector('.user-input');
      city = userInput.value;
    }

    if (!city) return;

    if (degreesToggle) {
      city = lastCity;
    }

    lastCity = city;
    console.log(city);

    let cityUrl = requestCityUrl(city);
    let coords = await getCoord(cityUrl);
    let forcecastUrl = requestForecastUrl(coords, unit);
    let forecastWeather = await getForecast(forcecastUrl);
    forecastWeather.name = coords.name;
    forecastWeather.country = coords.country;
    renderWeatherData(forecastWeather, unit);
    renderWeatherDetails(forecastWeather, unit);
    renderDailyWeatherForecast(forecastWeather, unit);
    degreesToggle = false;
  } catch (error) {
    document.querySelector('.error-message').style.visibility = 'visible';
  }
  document.querySelector('.user-input').value = '';
}

test(units, true);
