import axios from 'axios';
import {
  LOAD_PLACES_SUCCESS,
  CREATE_PLACE_SUCCESS,
  GET_PLACE_SUCCESS,
  UPDATE_PLACE_SUCCESS,
  DELETE_PLACE_SUCCESS
} from 'common/constants/actionTypes';

const BASE_URL = process.env.API_BASE_URL;

export function requestHeaders() {
  return { AUTHORIZATION: `Bearer ${localStorage.jwt}` };
}

export function loadPlacesSuccess(places) {
  return { type: LOAD_PLACES_SUCCESS, payload: places };
}

const loadData = headers => axios.get(`${BASE_URL}/places`, { headers });

export const loadPlaces = () => (dispatch) => {
  const headers = requestHeaders();
  return loadData(headers)
    .then((response) => {
      dispatch(loadPlacesSuccess(response.data));
    })
    .catch((error) => {
      console.error('axios error', error); // eslint-disable-line no-console
    });
};

export function getPlaceSuccess(place) {
  return { type: GET_PLACE_SUCCESS, payload: place };
}

const loadPlace = (id, headers) => axios.get(`${BASE_URL}/places/${id}`, { headers });

export const getPlaceById = id => (dispatch) => {
  const headers = requestHeaders();
  return loadPlace(id, headers)
    .then((response) => {
      dispatch(getPlaceSuccess(response.data));
    })
    .catch((error) => {
      // istanbul ignore next
      console.error('axios error', error); // eslint-disable-line no-console
    });
};

export function createPlaceSuccess(place) {
  return { type: CREATE_PLACE_SUCCESS, payload: place };
}

const savePlace = (place, headers) => axios.post(`${BASE_URL}/places`, { place }, { headers });

export const createPlace = place => (dispatch) => {
  const headers = requestHeaders();
  return savePlace(place, headers)
    .then((response) => {
      dispatch(createPlaceSuccess(response.data));
    })
    .catch((error) => {
      // istanbul ignore next
      console.error('axios error', error); // eslint-disable-line no-console
    });
};


export function updatePlaceSuccess(place) {
  return { type: UPDATE_PLACE_SUCCESS, payload: place };
}

const saveUpdatedPlace = (place, headers) => axios.put(`${BASE_URL}/places/${place.id}`, { place }, { headers });

export const updatePlace = place => (dispatch) => {
  const headers = requestHeaders();
  return saveUpdatedPlace(place, headers)
    .then((response) => {
      dispatch(updatePlaceSuccess(response.data));
    })
    .catch((error) => {
      // istanbul ignore next
      console.error('axios error', error); // eslint-disable-line no-console
    });
};

export function deletePlaceSuccess(place) {
  return { type: DELETE_PLACE_SUCCESS, payload: place };
}

const saveDeletedPlace = (id, headers) => axios.delete(`${BASE_URL}/places/${id}`, { headers });

export const deletePlace = id => (dispatch) => {
  const headers = requestHeaders();
  return saveDeletedPlace(id, headers)
    .then((response) => {
      dispatch(deletePlaceSuccess(response.data));
    })
    .catch((error) => {
      // istanbul ignore next
      console.error('axios error', error); // eslint-disable-line no-console
    });
};
