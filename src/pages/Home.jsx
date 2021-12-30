import React, { useCallback, useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchedCityList } from "../cmps/SearchedCityList";
import { SelectedCityPreview } from "../cmps/SelectedCityPreview";
import {
  getLocations,
  getSelectedCity,
  newSearch,
  addCityToFavorites,
  removeCityFromFavorites,
  getUserFavorites,
  setUserMsg,
} from "../store/actions/weather.actions";
import { Button } from "react-bootstrap";
import { utilService } from "../services/util.service";

export const Home = ({ isDarkMode, location, isCelsius, setisCelsius }) => {
  const { userFavorites, searchedCities, selectedCity } = useSelector(
    (state) => state.weatherModule
  );
  const [isInFavorites, setIsInFavorites] = useState(false);
  const [selectedCityFavorite, setselectedCityFavorite] = useState(null);
  const searchRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const paramsString = location.search;
    const searchParams = new URLSearchParams(paramsString).get("selected");
    if (searchParams) {
      const selectedCityParams = userFavorites.filter(
        (city) => city.cityKey === searchParams
      );
      setselectedCityFavorite(selectedCityParams[0]);
    }
    dispatch(getUserFavorites());
  }, []);

  useEffect(() => {
    if (!selectedCityFavorite) return;
    dispatch(getSelectedCity(selectedCityFavorite));
  }, [selectedCityFavorite]);

  useEffect(() => {
    if (Object.keys(selectedCity).length === 0 || !selectedCity) return;
    const checkIfInFavorites = userFavorites
      ? userFavorites.filter((favoriteCity) => {
          return favoriteCity.cityKey === selectedCity.cityKey;
        })
      : [];
    checkIfInFavorites.length === 0
      ? setIsInFavorites(false)
      : setIsInFavorites(true);
  }, [selectedCity, userFavorites]);

  const setNewSearch = () => {
    dispatch(newSearch());
    searchRef.current.value = "";
  };
  //i used "useCallback" but it works as well just as a function"
  const debouncedSave = useCallback(
    utilService.debounce(
      (nextValue) => dispatch(getLocations(nextValue)),
      1000
    ),
    []
  );

  const handleChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    if (!value || Object.keys(selectedCity).length > 0) return;
    const english = /^[A-Za-z0-9]*$/;
    if (english.test(value)) {
      // use deBounce
      debouncedSave(value);
    } else {
      dispatch(setUserMsg("Search is only available in English"));
    }
  };
  const setSelectedCity = (cityInfo) => {
    dispatch(getSelectedCity(cityInfo));
  };
  const addToFavorites = (selectedCity) => {
    const newFavoriteCity = {
      _id: utilService.makeId(),
      cityKey: selectedCity.cityKey,
      name: selectedCity.name,
      country: selectedCity.country,
    };
    dispatch(addCityToFavorites(newFavoriteCity));
  };
  const removeFromFavorites = (cityKey) => {
    dispatch(removeCityFromFavorites(cityKey));
  };
  const toggleCelsius = () => {
    setisCelsius(!isCelsius);
  };

  return (
    <section className="main-home">
      <div className="search-container">
        <Button className="btn-primary" onClick={() => setNewSearch()}>
          Clear search
        </Button>
        <div className="input-field">
          <input
            className="form-input"
            ref={searchRef}
            type="text"
            name="search"
            placeholder=" "
            onChange={handleChange}
            autoComplete="off"
          />
          <label
            className={`form-label ${isDarkMode ? "dark" : ""}`}
            htmlFor="search for a city"
          >
            Search for a city
          </label>
        </div>
        <Button onClick={() => toggleCelsius()} className="btn btn-default">
          {!isCelsius && "Show ℃"}
          {isCelsius && "Show ℉"}
        </Button>
      </div>
      {Object.keys(selectedCity).length === 0 && (
        <SearchedCityList
          setSelectedCity={setSelectedCity}
          searchedCities={searchedCities}
        />
      )}
      {Object.keys(selectedCity).length > 0 && (
        <SelectedCityPreview
          setNewSearch={setNewSearch}
          addToFavorites={addToFavorites}
          selectedCity={selectedCity}
          isInFavorites={isInFavorites}
          isCelsius={isCelsius}
          isDarkMode={isDarkMode}
          removeFromFavorites={removeFromFavorites}
        />
      )}
    </section>
  );
};
