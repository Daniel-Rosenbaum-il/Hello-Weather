import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BsFillSunFill } from "react-icons/bs";
import { GiNightSky } from "react-icons/gi";
import { utilService } from "../services/util.service.js";
import { useSelector } from "react-redux";

export const Header = ({ isDarkMode, setIsDarkMode, isCelsius }) => {
  const { defaultCity } = useSelector((state) => state.weatherModule);
  const [isHidden, setToggleIsHidden] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  const toggleIsHidden = () => {
    setToggleIsHidden(!isHidden);
  };

  return (
    <header className="header">
      <div className="header-info container">
        <Link to="/">
          <h3 className="logo">HelloWeather</h3>
        </Link>
        <nav className={`nav ${!isHidden && "show"} `}>
          {defaultCity.name !== undefined && (
            <div className={`default-city flex space-between align-center `}>
              <p> {defaultCity.name + ":"}</p>
              <p>
                {" "}
                {!isCelsius &&
                  utilService.getCurrentWeather(defaultCity) + "℉"}{" "}
                {isCelsius &&
                  utilService.getCelsius(
                    utilService.getCurrentWeather(defaultCity)
                  ) + "℃"}
              </p>
            </div>
          )}
          <NavLink exact to="/">
            Home
          </NavLink>
          <NavLink to="/favorite">Favorites</NavLink>
          <div className="dark-mode-btn" onClick={() => toggleDarkMode()}>
            {isDarkMode && <BsFillSunFill></BsFillSunFill>}
            {!isDarkMode && <GiNightSky></GiNightSky>}
          </div>
        </nav>
        <div
          className={`menu ${!isHidden ? "change" : ""} ${
            isDarkMode ? "dark" : ""
          }`}
          onClick={() => toggleIsHidden()}
        >
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
      </div>
    </header>
  );
};
