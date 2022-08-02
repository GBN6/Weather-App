function requestCityUrl(cityName) {
  return `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=ad91878db984095ec2ab0941615ca997`;
}

function requestForecastUrl(coordinates, units) {
  return `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,alerts&units=${units}&appid=20f7632ffc2c022654e4093c6947b4f4`;
}

async function getCoord(url) {
  const response = await fetch(url);
  const weatherData = await response.json();
  const { coord } = weatherData;
  coord.name = weatherData.name;
  coord.country = weatherData.sys.country;

  console.log(weatherData);
  return coord;
}

async function getForecast(url) {
    const response = await fetch(url)
    const forecastData = await response.json();

    console.log(forecastData);
    return forecastData
}

export { requestCityUrl, requestForecastUrl, getCoord, getForecast };
