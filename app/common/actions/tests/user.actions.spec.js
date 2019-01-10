import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';

import * as types from 'common/constants/actionTypes';

import {
  createUser,
  createUserSuccess,
} from '../user.actions';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('User Actions', () => {
  describe('createUser', () => {
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
      const store = mockStore({});
      store.dispatch(createUser()).then(() => {
        const actions = store.getActions();
        let i = -1;
        expect(actions[++i].type).toEqual(types.CREATE_USER_SUCCESS);
        done();
      });
    });
    it('returns the expected action', () => {
      expect(createUserSuccess('DATA')).toEqual({
        type: types.CREATE_USER_SUCCESS,
        payload: 'DATA'
      });
    });
  });
});
