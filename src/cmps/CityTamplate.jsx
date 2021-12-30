import React from 'react'
import { Card } from 'react-bootstrap'
import { utilService } from '../services/util.service'
import { MdFavorite } from 'react-icons/md'
import { imageService } from '../services/image.service'

export const CityTamplate = ({ isDarkMode, city, isInFavorites, removeFromFavorites, addToFavorites, forecast, isCelsius }) => {
    const date = forecast ? utilService.setDayStr(new Date(forecast.Date).getDay()) : null
    const weather = forecast ? forecast.Temperature.Maximum.Value : null
    const cityWeatherIcon = (city && city.weatherForecast)? utilService.getCurrentTimeIcon(city) : ''
    return (
        <Card className={`city-tamplate ${isDarkMode ? 'card-dark' : ''} ${(cityWeatherIcon > 6)? 'cloudy':'sunny' } `} >
            {!forecast && <Card.Body className={`flex align-center column`}>
                {!isInFavorites && <button className="favorite-btn add-to-favorite" onClick={() => {
                    addToFavorites(city)
                }}><MdFavorite /></button>}
                {isInFavorites && <button className="favorite-btn remove-from-favorite" onClick={() => {
                    removeFromFavorites(city.cityKey)
                }}><MdFavorite /></button>}
                {cityWeatherIcon && <img src={imageService.getIcon(cityWeatherIcon)} alt="weather-pic" />}
                <h2> {city.name}</h2>
                {city.weatherForecast && <p>{!isCelsius && utilService.getCurrentWeather(city) + '℉'} {isCelsius && utilService.getCelsius(utilService.getCurrentWeather(city)) + '℃'}</p>}
            </Card.Body>}
            {forecast && <Card.Body className="flex align-center column">
                <img src={imageService.getIcon(forecast.Day.Icon)} alt="weather-pic" />
                <h5> {date}</h5>
                <p>{!isCelsius && weather + '℉'} {isCelsius && utilService.getCelsius(weather) + '℃'}</p>
            </Card.Body>}
        </Card>
    )
}
