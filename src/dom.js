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
  let temperatureUnit = '°C';

  if (units === 'imperial') {
    temperatureUnit = '°F';
  }

  const currentDayPlusOne = document.querySelector(
    '#current-day-plus-one .forecast-daily-day'
  );
  const currentDayPlusTwo = document.querySelector(
    '#current-day-plus-two .forecast-daily-day'
  );
  const currentDayPlusThree = document.querySelector(
    '#current-day-plus-three .forecast-daily-day'
  );
  const currentDayPlusFour = document.querySelector(
    '#current-day-plus-four .forecast-daily-day'
  );
  const currentDayPlusFive = document.querySelector(
    '#current-day-plus-five .forecast-daily-day'
  );

  currentDayPlusOne.textContent = weatherDate(data.daily[1].dt).slice(0, 3);
  currentDayPlusTwo.textContent = weatherDate(data.daily[2].dt).slice(0, 3);
  currentDayPlusThree.textContent = weatherDate(data.daily[3].dt).slice(0, 3);
  currentDayPlusFour.textContent = weatherDate(data.daily[4].dt).slice(0, 3);
  currentDayPlusFive.textContent = weatherDate(data.daily[5].dt).slice(0, 3);
}



export { renderWeatherData, renderWeatherDetails };
