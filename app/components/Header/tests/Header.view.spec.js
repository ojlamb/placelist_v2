import React from 'react';
import * as sessionActions from 'common/actions/session.actions';
import { HeaderView } from '../Header.view';

const getProps = ({
  session
} = {}) => ({
  classes: {},
  session,
  actions: {
    logOutUser: jest.fn(),
    sessionActions
  }
});

const getJSX = props => (<HeaderView {...getProps(props)} />);

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

  describe('methods', () => {
    let wrapper;
    let instance;
    beforeAll(() => {
      const props = { session: { active: true, user: { jwt: 'FOO' } } };
      wrapper = shallow(<HeaderView {...getProps(props)} />);
      instance = wrapper.instance();
    });
    it('updates the state for open menu', () => {
      instance.handleMenu({ currentTarget: 'FOO' });
      expect(wrapper.state('anchorEl')).toBe('FOO');
    });
    it('updates the state for close menu', () => {
      instance.handleClose();
      expect(wrapper.state('anchorEl')).toBe(null);
    });
    it('updates the state for logout', () => {
      const event = {
        preventDefault: jest.fn()
      };
      instance.logOut(event);
      expect(wrapper.state('anchorEl')).toBe(null);
    });
  });
});
