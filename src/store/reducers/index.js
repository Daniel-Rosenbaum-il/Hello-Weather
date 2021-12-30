import { combineReducers } from 'redux'
import { weatherReducer } from './weather.reducer'


export const rootReducer = combineReducers({
  weatherModule: weatherReducer,

})