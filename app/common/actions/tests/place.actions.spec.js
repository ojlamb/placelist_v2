import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';

import * as types from 'common/constants/actionTypes';

import {
  loadPlaces,
  loadPlacesSuccess,
  createPlace,
  createPlaceSuccess,
  updatePlace,
  updatePlaceSuccess,
  deletePlace,
  deletePlaceSuccess,
  getPlaceById,
  getPlaceSuccess
} from '../place.actions';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('place Actions', () => {
  describe('loadPlaces', () => {
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
      const store = mockStore({ places: [] });
      store.dispatch(loadPlaces()).then(() => {
        const actions = store.getActions();
        let i = -1;
        expect(actions[++i].type).toEqual(types.LOAD_PLACES_SUCCESS);
        done();
      });
    });
    it('returns the expected action', () => {
      expect(loadPlacesSuccess('DATA')).toEqual({
        type: types.LOAD_PLACES_SUCCESS,
        payload: 'DATA'
      });
    });
  });

  describe('Get Place By ID', () => {
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
      const store = mockStore({ places: [] });
      store.dispatch(getPlaceById(1)).then(() => {
        const actions = store.getActions();
        let i = -1;
        expect(actions[++i].type).toEqual(types.GET_PLACE_SUCCESS);
        done();
      });
    });
    it('returns the expected action', () => {
      expect(getPlaceSuccess('PLACE')).toEqual({
        type: types.GET_PLACE_SUCCESS,
        payload: 'PLACE'
      });
    });
  });

  describe('Create Place', () => {
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
      const store = mockStore({ places: [] });
      store.dispatch(createPlace({ place: 'place' })).then(() => {
        const actions = store.getActions();
        let i = -1;
        expect(actions[++i].type).toEqual(types.CREATE_PLACE_SUCCESS);
        done();
      });
    });
    it('returns the expected action', () => {
      expect(createPlaceSuccess('PLACE')).toEqual({
        type: types.CREATE_PLACE_SUCCESS,
        payload: 'PLACE'
      });
    });
  });

  describe('Update Place', () => {
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
      const store = mockStore({ places: [] });
      store.dispatch(updatePlace({ place: 'place' })).then(() => {
        const actions = store.getActions();
        let i = -1;
        expect(actions[++i].type).toEqual(types.UPDATE_PLACE_SUCCESS);
        done();
      });
    });
    it('returns the expected action', () => {
      expect(updatePlaceSuccess('PLACE')).toEqual({
        type: types.UPDATE_PLACE_SUCCESS,
        payload: 'PLACE'
      });
    });
  });

  describe('Delete Place', () => {
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
      const store = mockStore({ places: [] });
      store.dispatch(deletePlace({ place: 'place' })).then(() => {
        const actions = store.getActions();
        let i = -1;
        expect(actions[++i].type).toEqual(types.DELETE_PLACE_SUCCESS);
        done();
      });
    });
    it('returns the expected action', () => {
      expect(deletePlaceSuccess('PLACE')).toEqual({
        type: types.DELETE_PLACE_SUCCESS,
        payload: 'PLACE'
      });
    });
  });
});
