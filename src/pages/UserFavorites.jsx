import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CityTamplate } from '../cmps/CityTamplate'
import { getUserFavorites, setUserMsg } from '../store/actions/weather.actions'
import { useSpring, animated } from 'react-spring'
import { Button } from 'react-bootstrap'
import { weatherService } from '../services/weather.service'

export const UserFavorites = ({ isDarkMode, isCelsius, setisCelsius }) => {
    const { userFavorites } = useSelector(state => state.weatherModule)
    const [updatedFavorites, setUpdatedFavorites] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserFavorites())
    }, [])

    useEffect(() => {
        if (!userFavorites || userFavorites.length === 0) return
        const favorites = userFavorites.map(city =>
            weatherService.getSelectedCity(city))
        Promise.all(favorites)
            .then((res) => {
                setUpdatedFavorites(res)
            }).catch(error => {
                console.log(error)
                setUpdatedFavorites(userFavorites)
                dispatch(setUserMsg('Can not set current weather, please try again later'))
            })
    }, [userFavorites])

    const animatedStyle = useSpring({
        from: { opacity: 0, marginLeft: -500 },
        to: { opacity: 1, marginLeft: 0 },
        config: { duration: 600 }
    })
    const toggleCelsius = () => {
        setisCelsius(!isCelsius)
    }

    return (
        <section className="favorites-main container">
            <div className="favorites-header flex align-center space-between mb-20">
                <h3>This is your favorite places</h3>
                <Button onClick={() => toggleCelsius()} className="btn btn-default">{!isCelsius && 'Show ℃'}{isCelsius && 'Show ℉'}</Button>
            </div>
            <animated.div style={animatedStyle}>
                {(!userFavorites || userFavorites.length === 0) && <p> 'No favorites'</p>}
                <div className="favorite-list flex wrap">
                    {updatedFavorites.length > 0 && updatedFavorites.map(favoriteCity => {
                        return <Link to={`/?selected=${favoriteCity.cityKey}`} key={'fav' + favoriteCity.cityKey}><CityTamplate isCelsius={isCelsius} isDarkMode={isDarkMode} city={favoriteCity} /></Link>
                    })}
                </div>
            </animated.div>
        </section>
    )
}
