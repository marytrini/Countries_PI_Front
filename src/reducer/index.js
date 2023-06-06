import {
  GET_COUNTRIES,
  SEARCH_BY_NAME,
  GET_COUNTRY_BY_NAME,
  GET_COUNTRY_DETAIL,
  GET_ACTIVITIES,
  CREATE_ACTIVITY,
  FILTER_BY_ACTIVITIES,
  FILTER_BY_CONTINENT,
  ORDER_BY_NAME,
  ORDER_BY_POPULATION,
  ERROR,
  DELETE_ACTIVITY,
  UPDATE_ACTIVITY,
} from "../actions/action-types";

const intialState = {
  countries: [],
  allCountries: [],
  activities: [],
  allActivities: [],
  detail: {},
  filterByContinent: "All",
  filterByActivity: "All",
  loading: true,
  error: false,
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };
    case SEARCH_BY_NAME:
      return {
        ...state,
        countries: action.payload,
      };
    case GET_COUNTRY_BY_NAME:
      let country =
        action.payload === ""
          ? state.allCountries
          : state.countries.filter((el) =>
              el.name.toLowerCase().includes(action.payload.toLowerCase())
            );
      return {
        ...state,
        countries: country,
      };
    case GET_COUNTRY_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
        allActivities: action.payload,
      };
    case CREATE_ACTIVITY:
      return {
        ...state,
      };
    case DELETE_ACTIVITY:
      return {
        ...state,
        activities: action.payload,
        allActivities: action.payload,
      };
    case UPDATE_ACTIVITY:
      const updatedActivities = state.allActivities.map((activity) =>
        activity.id === action.payload.id ? action.payload : activity
      );
      return {
        ...state,
        activities: updatedActivities,
        allActivities: updatedActivities,
      };
    case FILTER_BY_CONTINENT:
      let filteredContinent =
        action.payload === "All"
          ? state.allCountries
          : state.allCountries.filter(
              (ele) => ele.continent === action.payload
            );

      return {
        ...state,
        countries: filteredContinent,
        filterByContinent: action.payload,
      };
    case FILTER_BY_ACTIVITIES:
      const filteredActivity =
        action.payload === "All"
          ? state.allCountries.filter(
              (country) => country.Activities && country.Activities.length > 0
            )
          : state.allCountries.filter(
              (country) =>
                country.Activities &&
                country.Activities.find((act) => act.name === action.payload)
            );
      return {
        ...state,
        countries: filteredActivity,
      };
    case ORDER_BY_NAME:
      let sortedByName =
        action.payload === "asc"
          ? state.countries.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.countries.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        countries: sortedByName,
      };
    case ORDER_BY_POPULATION:
      let sortedByPop =
        action.payload === "dense"
          ? state.countries.sort(function (a, b) {
              if (a.population > b.population) {
                return 1;
              }
              if (b.population > a.population) {
                return -1;
              }
              return 0;
            })
          : state.countries.sort(function (a, b) {
              if (a.population > b.population) {
                return -1;
              }
              if (b.population > a.population) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        countries: sortedByPop,
      };
    case ERROR:
      return {
        ...state,
        error: true,
      };
    default:
      return { ...state };
  }
};
export default reducer;
