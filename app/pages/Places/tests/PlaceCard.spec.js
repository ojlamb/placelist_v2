import React from 'react';
import { PlaceCard } from '../PlaceCard';

const getProps = ({
  address,
  category,
  id,
  name,
} = {}) => ({
  classes: {},
  address,
  category,
  id,
  name,
});

const getJSX = props => (<PlaceCard {...getProps(props)} />);

describe('HeaderView', () => {
  describe('snapshots', () => {
    const scenarios = [
      { address: '123 main st.',
        category: 'dinner',
        id: 1,
        name: 'Owens Grill'
      }
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
});
