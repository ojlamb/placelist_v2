import React from 'react';
import { PlaceInfo } from '../Placeinfo';

const getProps = ({
  place
} = {}) => ({
  classes: {},
  place,
  actions: {
    loadPlaces: jest.fn(),
    createPlace: jest.fn()
  }
});

const getJSX = props => (<PlaceInfo {...getProps(props)} />);

describe('PlaceInfo', () => {
  describe('snapshots', () => {
    const scenarios = [
      { place: { id: 1, name: 'place 1', description: 'a cool place', category: 'dinner', address: '123 main st.' }
      }];

    scenarios.forEach((props, i) => {
      describe(`Scenario ${i + 1}`, () => {
        it('matches snapshot', () => {
          const wrapper = shallow(getJSX(props));
          expect(wrapper).toMatchSnapshot();
        });
      });
    });
  });
});
