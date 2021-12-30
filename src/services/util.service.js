export const utilService = {
  makeId,
  getCelsius,
  setDayStr,
  getCurrentWeather,
  getCurrentTimeIcon,
  debounce,
};

function setDayStr(num) {
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekDays[+num];
}

function getCelsius(fahrenheit) {
  return ((fahrenheit - 32) / 1.8).toFixed(1);
}

function makeId(length = 5) {
  var txt = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

function getCurrentWeather(city) {
  const currentHour = new Date(Date.now).getHours();
  if (currentHour > 6 && currentHour < 17) {
    return city.maxWeather;
  } else {
    return city.minWeather;
  }
}

function getCurrentTimeIcon(city) {
  const currentHour = new Date(Date.now).getHours();
  if (currentHour > 6 && currentHour < 17) {
    return city.weatherForecast.DailyForecasts[0].Day.Icon;
  } else {
    return city.weatherForecast.DailyForecasts[0].Night.Icon;
  }
}

function debounce(func, delay = 300) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
