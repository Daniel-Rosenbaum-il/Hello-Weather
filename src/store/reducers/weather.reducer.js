const initialState = {
  defaultCity: [],
  userFavorites: [],
  searchedCities: [],
  selectedCity: [],
  userMsg: "",
};

export function weatherReducer(state = initialState, action = {}) {
  switch (action.type) {
    case "SET_USER_MSG":
      return { ...state, userMsg: action.userMsg };
    case "SET_DEFAULT_CITY":
      return { ...state, defaultCity: action.defaultCity };
    case "SET_SEARCHED_CITIES":
      return { ...state, searchedCities: action.searchedCities };
    case "SET_SELECTED_CITY":
      return { ...state, selectedCity: action.selectedCity };
    case "SET_USER_FAVORITES":
      return { ...state, userFavorites: action.userFavorites };
    case "REMOVE_SELECTED_AND_SEARCHED_CITY":
      return {
        ...state,
        selectedCity: action.selectedCity,
        searchedCities: action.searchedCities,
      };
    case "REMOVE_FROM_FAVORITES":
      return {
        ...state,
        userFavorites: state.userFavorites.filter(
          (city) => city.cityKey !== action.cityKey
        ),
      };
    case "ADD_TO_FAVORITES":
      return {
        ...state,
        userFavorites: [...state.userFavorites, action.userFavorites],
      };
    default:
      return state;
  }
}
