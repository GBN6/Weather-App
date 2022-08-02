import {
  requestForecastUrl,
  getForecast,
  requestCityUrl,
  getCoord,
} from './weatherApi';

const cityUrl = requestCityUrl('Warsaw');
getCoord(cityUrl);
