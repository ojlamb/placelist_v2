import React from 'react';

import MapPin from '../MapPin';

const getProps = size => ({
  size,
  onClick() {},
});

const getJSX = props => (<MapPin {...getProps(props)} />);

describe('snapshots', () => {
  const scenarios = [
    20, 0
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
