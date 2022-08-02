import {
  requestForecastUrl,
  getForecast,
  requestCityUrl,
  getCoord,
  weatherDate,
  weatherTime,
} from './weatherApi';

const cityUrl = requestCityUrl('Warsaw');

async function test() {
  let coords = await getCoord(cityUrl);
  let forcecastUrl = requestForecastUrl(coords, 'metric');
  let forecastWeather = await getForecast(forcecastUrl);
  console.log(forecastWeather);
  console.log(weatherDate(forecastWeather.current.dt));
  console.log(weatherTime(forecastWeather.current.dt));

}
test();
