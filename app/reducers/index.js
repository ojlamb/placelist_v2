// Set up your root reducer here...
import { combineReducers } from 'redux';

import users from 'common/reducers/user.reducer';
import places from 'common/reducers/place.reducer';
import session from 'common/reducers/session.reducer';


const rootReducer = combineReducers({
  places,
  users,
  session
});

export default rootReducer;
