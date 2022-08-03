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
  weatherInfoTime.textContent = weatherTime(data.current.dt, data.timezone);
  weatherInfoTemp.textContent = `${Math.round(
    data.current.temp
  )} ${temperatureUnit}`;
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

function renderDailyWeatherForecast(data, units) {
  const forecastDailyContainer = document.querySelector(
    '.forecast-daily-container'
  );
  let temperatureUnit = '°C';

  if (units === 'imperial') {
    temperatureUnit = '°F';
  }

  while (forecastDailyContainer.firstChild) {
    forecastDailyContainer.removeChild(forecastDailyContainer.firstChild);
  }

  data.daily.forEach((day, index) => {
    if (index !== 0) {
      const forecastDailyTile = document.createElement('div');
      const forecastDailyDay = document.createElement('div');
      const forecastDailyTempContainer = document.createElement('div');
      const forecastDailyTempHigh = document.createElement('div');
      const forecastDailyTempLow = document.createElement('div');
      const forecastDailyIcon = document.createElement('div');

      forecastDailyTile.classList.add('forecast-daily');
      forecastDailyTile.setAttribute('data-index', `${index}`);
      forecastDailyDay.classList.add('forecast-daily-day');
      forecastDailyTempContainer.classList.add('forecast-daily-temp');
      forecastDailyTempHigh.classList.add('forecast-daily-temp-high');
      forecastDailyTempLow.classList.add('forecast-daily-temp-low');
      forecastDailyIcon.classList.add('forecast-daily-icon');

      forecastDailyDay.textContent = weatherDate(day.dt).slice(0, 3);
      forecastDailyTempHigh.textContent = `${Math.round(
        day.temp.max
      )} ${temperatureUnit}`;
      forecastDailyTempLow.textContent = `${Math.round(
        day.temp.min
      )} ${temperatureUnit}`;
      forecastDailyIcon.innerHTML = getIcon(day.weather[0].icon);

      forecastDailyTempContainer.appendChild(forecastDailyTempHigh);
      forecastDailyTempContainer.appendChild(forecastDailyTempLow);

      forecastDailyTile.appendChild(forecastDailyDay);
      forecastDailyTile.appendChild(forecastDailyTempContainer);
      forecastDailyTile.appendChild(forecastDailyIcon);

      forecastDailyContainer.appendChild(forecastDailyTile);
    }
  });
  return forecastDailyContainer;
}

export { renderWeatherData, renderWeatherDetails, renderDailyWeatherForecast };
