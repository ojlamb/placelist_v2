import React from 'react';
import { Home } from '../Home.view';

const getProps = ({
  session
} = {}) => ({
  classes: {},
  session
});

const getJSX = props => (<Home {...getProps(props)} />);

describe('HeaderView', () => {
  describe('snapshots', () => {
    const scenarios = [
      { session: { active: false, user: {} } },
      { session: { active: true, user: { jwt: 'FOO' } } }
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
