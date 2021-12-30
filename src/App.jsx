import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router";
import { HashRouter as Router } from "react-router-dom";
import { Footer } from "./cmps/Footer";
import { Header } from "./cmps/Header";
import { Home } from "./pages/Home";
import { UserFavorites } from "./pages/UserFavorites";
import { getDefaultWeather, getGeoCity } from "./store/actions/weather.actions";

export const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCelsius, setisCelsius] = useState(false);
  const [defaultWeather, setDefaultWeather] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(setGeoSuccess, setGeoError);
  }, []);

  const setGeoSuccess = (success) => {
    const location = success;
    setDefaultWeather(location.coords);
  };

  const setGeoError = () => {
    setDefaultWeather(null);
  };

  useEffect(() => {
    if (defaultWeather === null) dispatch(getDefaultWeather("tel-aviv"));
    if (defaultWeather !== null)
      dispatch(getGeoCity(defaultWeather.latitude, defaultWeather.longitude));
  }, [defaultWeather]);

  return (
    <div className={`app ${isDarkMode ? "dark-mode" : ""}`}>
      <Router>
        <Header
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          isCelsius={isCelsius}
        />
        <main className="container">
          <Switch>
            <Route
              path="/favorite"
              render={(props) => (
                <UserFavorites
                  {...props}
                  isDarkMode={isDarkMode}
                  isCelsius={isCelsius}
                  setisCelsius={setisCelsius}
                />
              )}
            />
            <Route
              path="/"
              render={(props) => (
                <Home
                  {...props}
                  isDarkMode={isDarkMode}
                  isCelsius={isCelsius}
                  setisCelsius={setisCelsius}
                />
              )}
            />
          </Switch>
        </main>
        <Footer />
      </Router>
    </div>
  );
};
