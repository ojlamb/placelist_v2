import React from 'react';
import theme from 'test/theme';
import { PlaceDetail, styles } from '../PlaceDetail.view';

const getProps = ({
  place
} = {}) => ({
  classes: {},
  place,
  actions: {
    loadPlaces: jest.fn(),
    getPlaceById: jest.fn(),
    deletePlace: jest.fn(),
    updatePlace: jest.fn()
  },
  match: {
    params: {
      id: 1
    },
    path: '/',
    url: '/'
  },
  history: {
    push: jest.fn()
  },
  session: {
    user: {
      user: { id: 1 }
    }
  }
});

const getJSX = props => (<PlaceDetail {...getProps(props)} />);

describe('PlaceDetail', () => {
  describe('styles', () => {
    it('matches snapshot', () => {
      expect(styles(theme)).toMatchSnapshot();
    });
  });

  describe('snapshots', () => {
    const scenarios = [
      { place: { id: 1, lat: 40, lon: 100, user: { id: 1, name: 'owen' } } }
    ];

    scenarios.forEach((props, i) => {
      describe(`Scenario ${i + 1}`, () => {
        it('matches snapshot', () => {
          const wrapper = shallow(getJSX(props));
          expect(wrapper).toMatchSnapshot();
        });
      });
    });
  });

  describe('methods', () => {
    let wrapper;
    let instance;
    beforeAll(() => {
      const props = { place: { id: 1, lat: 40, lon: 100, user: { id: 1, name: 'owen' } } };
      wrapper = shallow(<PlaceDetail {...getProps(props)} />);
      instance = wrapper.instance();
    });
    it('updates the state for open form', () => {
      instance.handleClickEdit();
      expect(wrapper.state('formOpen')).toBe(true);
    });
    it('updates the state for close form', () => {
      instance.handleClose();
      expect(wrapper.state('formOpen')).toBe(false);
    });
    it('updates the state for close delete form', () => {
      instance.handleDeleteClose();
      expect(wrapper.state('deleteFormOpen')).toBe(false);
    });
    it('updates the state for close delete form', () => {
      instance.handleClickDelete();
      expect(wrapper.state('deleteFormOpen')).toBe(true);
    });
    it('updates the state for edit form', () => {
      instance.updatePlace({ id: 1, category: 'drinks', description: 'new description' });
      expect(wrapper.state('formOpen')).toBe(false);
    });
    it('updates the state for delete alert', () => {
      instance.deletePlace({ id: 1, category: 'drinks', description: 'new description' });
      expect(wrapper.state('formOpen')).toBe(false);
    });
  });
});
