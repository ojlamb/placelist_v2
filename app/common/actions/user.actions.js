import axios from 'axios';
import { CREATE_USER_SUCCESS } from 'common/constants/actionTypes';

const BASE_URL = process.env.API_BASE_URL;

export function createUserSuccess(place) {
  return { type: CREATE_USER_SUCCESS, payload: place };
}

const postNewUser = user => axios.post(`${BASE_URL}/users`, { user });

export const createUser = user => dispatch => postNewUser(user)
  .then((response) => {
    dispatch(createUserSuccess(response.data));
  })
  .catch((error) => {
    // istanbul ignore next
    console.error('axios error', error); // eslint-disable-line no-console
  });
