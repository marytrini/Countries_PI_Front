import axios from "axios";
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
} from "./action-types";

export const getCountries = () => {
  return async (dispatch) => {
    try {
      let dataInfo = await axios.get(
        "http://localhost:3001/countries"
      );

      return dispatch({
        type: GET_COUNTRIES,
        payload: dataInfo.data,
      });
    } catch (error) {
      alert("Error loading data");
    }
  };
};

export const searchByName = (input) => {
  return async (dispatch) => {
    try {
      const search = await axios.get(
        `http://localhost:3001/countries?name= ${input}`
      );
      return dispatch({
        type: SEARCH_BY_NAME,
        payload: search.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

export const getCountryByName = (name) => {
  return {
    type: GET_COUNTRY_BY_NAME,
    payload: name,
  };
};

export const getDetail = (id) => {
  return async (dispatch) => {
    try {
      const detail = await axios.get(
        `http://localhost:3001/countries/${id}`
      );
      return dispatch({
        type: GET_COUNTRY_DETAIL,
        payload: detail.data,
      });
    } catch (error) {
      alert("Must enter a valid id");
    }
  };
};

export const getActivities = () => {
  return async (dispatch) => {
    try {
      const activity = await axios.get(
        "http://localhost:3001/activity"
      );
      return dispatch({
        type: GET_ACTIVITIES,
        payload: activity.data,
      });
    } catch (error) {
      alert("Something went wrong");
    }
  };
};

export const createActivity = (payload) => {
  const activity = {
    name: payload.name,
    difficulty: payload.difficulty,
    duration: payload.duration,
    season: payload.season,
    countries: payload.countries,
  };
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/activity",
        activity
      );

      return dispatch({
        type: CREATE_ACTIVITY,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

export const deleteActivity = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(
        `http://localhost:3001/activity/${id}`
      );

      dispatch({
        type: DELETE_ACTIVITY,
        payload: id,
      });
    } catch (error) {
      dispatch({ type: ERROR, payload: error.message });
    }
  };
};

export const updateActivity = (payload) => {
  const activity = {
    id: payload.id,
    name: payload.name,
    difficulty: payload.difficulty,
    duration: payload.duration,
    season: payload.season,
    countries: payload.countries,
  };

  return async (dispatch) => {
    try {
      await axios.put(
        "http://localhost:3001/activity",
        activity
      );
      return dispatch({
        type: UPDATE_ACTIVITY,
      });
    } catch (error) {
      return dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};
export const filterByContinent = (continent) => {
  return {
    type: FILTER_BY_CONTINENT,
    payload: continent,
  };
};

export const filterByActivities = (payload) => {
  return {
    type: FILTER_BY_ACTIVITIES,
    payload,
  };
};

export const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
};

export const orderByPopulation = (payload) => {
  return {
    type: ORDER_BY_POPULATION,
    payload,
  };
};
