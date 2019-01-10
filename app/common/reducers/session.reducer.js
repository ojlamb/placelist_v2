import { LOGIN_USER_SUCCESS, LOG_OUT } from 'common/constants/actionTypes';

const userObj = localStorage.user ? JSON.parse(localStorage.user) : {};
const initialState = {
  active: !!localStorage.jwt,
  user: userObj
};

const sessionReducer = (state = initialState, action) => {
  if (action.type === LOGIN_USER_SUCCESS) {
    localStorage.setItem('jwt', action.payload.jwt);
    localStorage.setItem('user', JSON.stringify(action.payload));
    return {
      ...state,
      user: action.payload,
      active: true
    };
  }
  if (action.type === LOG_OUT) {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    return {
      user: {},
      active: false
    };
  }
  return state;
};

export default sessionReducer;
