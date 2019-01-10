import React from 'react';
import theme from 'test/theme';
import { Map, styles } from '../Map.view';

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

const getJSX = props => (<Map {...getProps(props)} />);

describe('Map', () => {
  describe('styles', () => {
    it('matches snapshot', () => {
      expect(styles(theme)).toMatchSnapshot();
    });
  });

  describe('snapshots', () => {
    const scenarios = [
      { places: [{ id: 1, lat: 100, lon: 40 }, { id: 2, lat: 100, lon: 40 }] }
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
      const props = { places: [{ id: 1, lat: 100, lon: 40 }, { id: 2, lat: 100, lon: 40 }] };
      wrapper = shallow(<Map {...getProps(props)} />);
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
    it('updates the state for close form', () => {
      instance.updateViewport('foo');
      expect(wrapper.state('viewport')).toBe('foo');
    });
    it('componentWillUnmount', () => {
      const componentWillUnmount = jest.spyOn(instance, 'componentWillUnmount');
      wrapper.unmount();
      expect(componentWillUnmount).toHaveBeenCalled();
    });
  });
});
