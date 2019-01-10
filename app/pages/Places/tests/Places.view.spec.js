import React from 'react';
import theme from 'test/theme';
import { PlaceView, styles } from '../Places.view';

const getProps = ({
  places
} = {}) => ({
  classes: {},
  places,
  actions: {
    loadPlaces: jest.fn(),
    createPlace: jest.fn()
  }
});

const getJSX = props => (<PlaceView {...getProps(props)} />);

describe('PlaceView', () => {
  describe('styles', () => {
    it('matches snapshot', () => {
      expect(styles(theme)).toMatchSnapshot();
    });
  });

  describe('snapshots', () => {
    const scenarios = [
      { places: [{ id: 1 }, { id: 2 }] }
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
      const props = { places: [{ id: 1 }, { id: 2 }] };
      wrapper = shallow(<PlaceView {...getProps(props)} />);
      instance = wrapper.instance();
    });
    it('updates the state for open form', () => {
      instance.handleClickOpen();
      expect(wrapper.state('formOpen')).toBe(true);
    });
    it('updates the state for close form', () => {
      instance.handleClose();
      expect(wrapper.state('formOpen')).toBe(false);
    });
    it('updates the state for close form', () => {
      instance.createPlace({ id: 1 });
      expect(wrapper.state('formOpen')).toBe(false);
    });
  });
});
