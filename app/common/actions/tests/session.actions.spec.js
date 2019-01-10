import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';

import * as types from 'common/constants/actionTypes';

import {
  loginUser,
  loginUserSuccess,
  logOutUser
} from '../session.actions';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Session Actions', () => {
  describe('loginUser', () => {
    beforeAll(() => {
      moxios.install();

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: 'DATA',
        });
      });
    });

    afterAll(() => {
      moxios.uninstall();
    });

    it('calls expected actions', (done) => {
      const store = mockStore({ session: [] });
      store.dispatch(loginUser()).then(() => {
        const actions = store.getActions();
        let i = -1;
        expect(actions[++i].type).toEqual(types.LOGIN_USER_SUCCESS);
        done();
      });
    });
    it('returns the expected action', () => {
      expect(loginUserSuccess('DATA')).toEqual({
        type: types.LOGIN_USER_SUCCESS,
        payload: 'DATA'
      });
    });
  });
  describe('logoutUser', () => {
    it('calls expected actions', (done) => {
      const store = mockStore({ session: {} });
      store.dispatch(logOutUser()).then(() => {
        const actions = store.getActions();
        let i = -1;
        expect(actions[++i].type).toEqual(types.LOG_OUT);
        done();
      });
    });
  });
});
