import React from "react";
import { Loader } from "./Loader";
import { SearchedCityPreview } from "./SearchedCityPreview";

export const SearchedCityList = ({ searchedCities, setSelectedCity }) => {
  if (!searchedCities || !Array.isArray(searchedCities)) return <Loader />;
  return (
    <section className="search-list">
      {searchedCities && searchedCities.length > 0 && (
        <p className="search-info-title">Select a city to see its forecast</p>
      )}
      {searchedCities &&
        searchedCities.map((city) => (
          <SearchedCityPreview
            setSelectedCity={setSelectedCity}
            key={city.AdministrativeArea.ID + city.Key}
            searchedCity={city}
          />
        ))}
    </section>
  );
};
