import {
  requestCityUrl,
  requestForecastUrl,
  getCoord,
  getForecast,
  weatherDate,
  weatherTime,
  getIcon,
} from './weatherApi';

function renderWeatherData(data, units) {
  let temperatureUnit = '°C';

  if (units === 'imperial') {
    temperatureUnit = '°F';
  }
  const weatherInfoDesc = document.querySelector('.weather-information-desc');
  const weatherInfoCity = document.querySelector('.weather-information-city');
  const weatherInfoDate = document.querySelector('.weather-information-date');
  const weatherInfoTime = document.querySelector('.weather-information-time');
  const weatherInfoTemp = document.querySelector('.weather-information-temp');
  const weatherInfoIcon = document.querySelector('.weather-information-icon');

  weatherInfoDesc.textContent = data.current.weather[0].description;
  weatherInfoCity.textContent = data.name;
  weatherInfoDate.textContent = weatherDate(data.current.dt);
  weatherInfoTime.textContent = weatherTime(data.current.dt);
  weatherInfoTemp.textContent = `${Math.round(data.current.temp)} ${temperatureUnit}`;
  weatherInfoIcon.innerHTML = getIcon(data.current.weather[0].icon);
}

function renderWeatherDetails(data, units) {
  let temperatureUnit = '°C';
  let speed = 'km/h';

  if (units === 'imperial') {
    temperatureUnit = '°F';
    speed = 'mph';
  }

  if (units === 'metric') {
    data.current.wind_speed *= 3.6;
  }

  const tempFeelLike = document.querySelector('#temp-feel');
  const humidity = document.querySelector('#humidity');
  const rainChance = document.querySelector('#chance-rain');
  const windSpeed = document.querySelector('#wind-speed');

  tempFeelLike.textContent = `${Math.round(
    data.current.feels_like
  )} ${temperatureUnit}`;
  humidity.textContent = `${data.current.humidity} %`;
  rainChance.textContent = `${data.daily[0].pop} %`;
  windSpeed.textContent = `${
    Math.round(data.current.wind_speed * 10) / 10
  } ${speed}`;
}

export {renderWeatherData, renderWeatherDetails};