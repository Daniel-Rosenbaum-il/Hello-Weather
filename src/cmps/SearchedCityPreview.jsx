import React from 'react'

export const SearchedCityPreview = ({ searchedCity, setSelectedCity }) => {
    const name = searchedCity.AdministrativeArea.LocalizedName
    const country = searchedCity.Country.LocalizedName
    return (
        <div className="search-preview">
            <p onClick={() => setSelectedCity({ name: name, cityKey: searchedCity.Key, country: country })}>{name} \ {country}</p>
        </div>
    )
}
