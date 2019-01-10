import axios from 'axios';
import { LOGIN_USER_SUCCESS, LOG_OUT } from 'common/constants/actionTypes';

const BASE_URL = process.env.API_BASE_URL;

export function loginUserSuccess(session) {
  return { type: LOGIN_USER_SUCCESS, payload: session };
}
const postLogin = credentials => axios.post(`${BASE_URL}/login`, { credentials });

export const loginUser = credentials => dispatch => new Promise((resolve, reject) => postLogin(credentials)
  .then((response) => {
    localStorage.setItem('jwt', response.jwt);
    dispatch(loginUserSuccess(response.data));
    resolve(response.data);
  })
  .catch((error) => {
    // istanbul ignore next
    reject(error.response);
  }));

export function logOutUserSuccess() {
  return { type: LOG_OUT };
}


export const logOutUser = () => dispatch => new Promise((resolve) => {
  localStorage.removeItem('jwt');
  dispatch(logOutUserSuccess());
  resolve('success');
});
