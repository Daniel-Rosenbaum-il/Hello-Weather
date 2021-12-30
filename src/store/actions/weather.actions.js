import { weatherService } from "../../services/weather.service";

export function getDefaultWeather(searchValue) {
  return async (dispatch) => {
    try {
      const defaultCity = await weatherService.getDefaultWeather(searchValue);
      dispatch({ type: "SET_DEFAULT_CITY", defaultCity });
    } catch (err) {
      console.log("WeatherActions: error in getDefaultWeather", err);
      dispatch({
        type: "SET_USER_MSG",
        userMsg: "Can not get Geolocation city - please try again tomorrow",
      });
    }
  };
}
export function getGeoCity(latitude, longitude) {
  return async (dispatch) => {
    try {
      const defaultCity = await weatherService.getGeoCity(latitude, longitude);
      dispatch({ type: "SET_DEFAULT_CITY", defaultCity });
    } catch (err) {
      dispatch({
        type: "SET_USER_MSG",
        userMsg: "Can not get Geolocation city - please try again tomorrow",
      });
      console.log("WeatherActions: error in getDefaultWeather", err);
    }
  };
}

export function getSelectedCity(key) {
  return async (dispatch) => {
    try {
      const selectedCity = await weatherService.getSelectedCity(key);
      dispatch({ type: "SET_SELECTED_CITY", selectedCity });
    } catch (err) {
      dispatch({
        type: "SET_USER_MSG",
        userMsg: "Can not get selected city - please try again tomorrow",
      });
      console.log("WeatherActions: err in getSelectedCity", err);
    }
  };
}

export function getLocations(searchValue) {
  return async (dispatch) => {
    try {
      const searchedCities = await weatherService.getLocations(searchValue);
      dispatch({ type: "SET_SEARCHED_CITIES", searchedCities });
    } catch (err) {
      console.log("WeatherActions: error in getLocations", err);
      dispatch({
        type: "SET_USER_MSG",
        userMsg: "Can not get your search - please try again tomorrow",
      });
    }
  };
}

export function getUserFavorites() {
  return async (dispatch) => {
    try {
      const userFavorites = await weatherService.getUserFavorites();
      dispatch({ type: "SET_USER_FAVORITES", userFavorites });
    } catch (err) {
      console.log("WeatherActions: err in getFavorites", err);
      dispatch({
        type: "SET_USER_MSG",
        userMsg: "Can not get your favorite Cities",
      });
    }
  };
}

export function newSearch() {
  return async (dispatch) => {
    try {
      dispatch({
        type: "REMOVE_SELECTED_AND_SEARCHED_CITY",
        selectedCity: {},
        searchedCities: [],
      });
    } catch (err) {
      console.log("WeatherActions: err in Remove City", err);
    }
  };
}

export function addCityToFavorites(selectedCity) {
  console.log("adiiing city:", selectedCity);
  return async (dispatch) => {
    try {
      const userFavorites = await weatherService.addCityToFavorites(
        selectedCity
      );
      dispatch({ type: "ADD_TO_FAVORITES", userFavorites });
      return userFavorites;
    } catch (err) {
      dispatch({
        type: "SET_USER_MSG",
        userMsg: "Can not get your favorite Cities",
      });
      console.log("WeatherActions: err in Adding to favorites", err);
    }
  };
}

export function removeCityFromFavorites(cityKey) {
  return async (dispatch) => {
    try {
      await weatherService.removeCityFromFavorites(cityKey);
      dispatch({ type: "REMOVE_FROM_FAVORITES", cityKey });
    } catch (err) {
      dispatch({
        type: "SET_USER_MSG",
        userMsg: "Problem in removing city from favorites",
      });

      console.log("WeatherActions: err in Adding to favorites", err);
    }
  };
}

export function setUserMsg(msg) {
  return (dispatch) => {
    dispatch({ type: "SET_USER_MSG", userMsg: msg });
  };
}
