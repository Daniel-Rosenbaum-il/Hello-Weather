import { storageService } from "./async-storage.service";
import axios from "axios";

const API_KEY = "y7aGxIT2asqFCSGA9B0hOM3XPGlrp1jR";

export const weatherService = {
  getLocations,
  getDefaultWeather,
  getSelectedCity,
  addCityToFavorites,
  removeCityFromFavorites,
  getUserFavorites,
  getGeoCity,
};

async function getDefaultWeather(currentCity) {
  try {
    const cityLocation = await axios.get(
      `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${currentCity}`
    );
    const cityWeather = await axios.get(
      `https://dataservice.accuweather.com/forecasts/v1/daily/1day/${cityLocation.data[0].Key}?apikey=${API_KEY}`
    );
    const defaultCity = {
      name: cityLocation.data[0].AdministrativeArea.LocalizedName,
      maxWeather: cityWeather.data.DailyForecasts[0].Temperature.Maximum.Value,
      minWeather: cityWeather.data.DailyForecasts[0].Temperature.Minimum.Value,
    };
    return defaultCity;
  } catch (err) {
    throw err;
  }
}
async function getSelectedCity(infoCity) {
  const { cityKey, name, country } = infoCity;
  try {
    const cityWeather = await axios.get(
      `https://dataservice.accuweather.com/forecasts/v1/daily/1day/${cityKey}?apikey=${API_KEY}`
    );
    const weatherForecast = await axios.get(
      `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${API_KEY}`
    );
    const selectedCity = {
      name,
      country,
      cityKey,
      maxWeather: cityWeather.data.DailyForecasts[0].Temperature.Maximum.Value,
      minWeather: cityWeather.data.DailyForecasts[0].Temperature.Minimum.Value,
      weatherForecast: weatherForecast.data,
    };
    return selectedCity;
  } catch (err) {
    throw err;
  }
}

async function getLocations(searchValue) {
  try {
    const resp = await axios.get(
      `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${searchValue}`
    );
    return resp.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
async function getGeoCity(lat, long) {
  try {
    const geoCityLocation = await axios.get(
      `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat},${long}`
    );
    const geoCityWeather = await axios.get(
      `https://dataservice.accuweather.com/forecasts/v1/daily/1day/${geoCityLocation.data.Key}?apikey=${API_KEY}`
    );
    const geoCity = {
      name: geoCityLocation.data.AdministrativeArea.LocalizedName,
      maxWeather:
        geoCityWeather.data.DailyForecasts[0].Temperature.Maximum.Value,
      minWeather:
        geoCityWeather.data.DailyForecasts[0].Temperature.Minimum.Value,
    };
    return geoCity;
  } catch (err) {
    throw err;
  }
}

async function getUserFavorites() {
  const userFavorites = await storageService.query("userFavorites");
  return userFavorites;
}
function removeCityFromFavorites(cityKey) {
  return storageService.remove("userFavorites", cityKey);
}

function addCityToFavorites(selectedCity) {
  return storageService.post("userFavorites", selectedCity);
}
