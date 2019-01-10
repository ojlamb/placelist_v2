import {
  LOAD_PLACES_SUCCESS,
  CREATE_PLACE_SUCCESS,
  GET_PLACE_SUCCESS,
  UPDATE_PLACE_SUCCESS,
  DELETE_PLACE_SUCCESS
} from 'common/constants/actionTypes';

export default function placeReducer(state = [], action) {
  if (action.type === LOAD_PLACES_SUCCESS) {
    return action.payload;
  }

  if (action.type === GET_PLACE_SUCCESS) {
    return [
      Object.assign({}, action.payload)
    ];
  }

  if (action.type === UPDATE_PLACE_SUCCESS) {
    return [
      ...state.filter(place => place.id !== action.payload.id),
      Object.assign({}, action.payload)
    ];
  }

  if (action.type === CREATE_PLACE_SUCCESS) {
    return [...state, Object.assign({}, action.payload)];
  }

  if (action.type === DELETE_PLACE_SUCCESS) {
    const newState = Object.assign([], state);
    const indexOfPlaceToDelete = state.findIndex(
      place => place.id === action.payload.id
    );
    newState.splice(indexOfPlaceToDelete, 1);
    return newState;
  }
  return state;
}
