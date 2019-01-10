import { CREATE_USER_SUCCESS } from 'common/constants/actionTypes';

const userReducer = (state = [], action) => {
  if (action.type === CREATE_USER_SUCCESS) {
    return action.payload;
  }

  return state;
};

export default userReducer;
