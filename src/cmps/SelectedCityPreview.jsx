import React from 'react'
import { CityTamplate } from './CityTamplate'
import { Loader } from './Loader'
import { useSpring, animated } from 'react-spring'


export const SelectedCityPreview = ({ isDarkMode, isInFavorites, removeFromFavorites, isCelsius, addToFavorites, selectedCity, setNewSearch }) => {
    const dailyForecasts = selectedCity ? selectedCity.weatherForecast.DailyForecasts : null
    const animatedStyle = useSpring({
        from: { opacity: 0, },
        to: { opacity: 1, },
        config: { duration: 1500 }
    })

    if (!selectedCity) return <Loader />
    return (
        <animated.div style={animatedStyle}>
            <section className={`selected-city-list `}>
                <div className="selected-city">
                    <CityTamplate isDarkMode={isDarkMode} city={selectedCity} isCelsius={isCelsius} isInFavorites={isInFavorites} addToFavorites={addToFavorites}
                        removeFromFavorites={removeFromFavorites} />
                </div>
                <div className="forecast-list">
                    {dailyForecasts.map((forecast, index) => <CityTamplate isDarkMode={isDarkMode} isCelsius={isCelsius} forecast={forecast} key={index} />)}
                </div>
            </section>
        </animated.div>
    )
}
