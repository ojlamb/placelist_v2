import React from 'react';
import theme from 'test/theme';
import { LoginPage, styles } from '../Login.view';

const getProps = actions => ({
  classes: {},
  actions,
  history: {
    push: jest.fn()
  }
});

const getJSX = props => (<LoginPage {...getProps(props)} />);

describe('SignupView', () => {
  describe('styles', () => {
    it('matches snapshot', () => {
      expect(styles(theme)).toMatchSnapshot();
    });
  });
  describe('snapshots', () => {
    const scenarios = [
      { loginUser: jest.fn().mockReturnValueOnce(Promise.resolve({ data: 'data' })) },
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
      const props = { loginUser: jest.fn().mockReturnValueOnce(Promise.resolve({ data: 'data' })) };
      wrapper = shallow(<LoginPage {...getProps(props)} />);
      instance = wrapper.instance();
    });
    it('updates the state for credentials', () => {
      instance.onChange({ target: { name: 'email', value: 'FOO' } });
      const credentials = wrapper.state('credentials');
      expect(credentials.email).toEqual('FOO');
    });
    it('updates the state when saving a user', () => {
      const login = jest.spyOn(instance, 'onSave');
      instance.onSave({ preventDefault: jest.fn() });
      expect(login).toHaveBeenCalled();
      expect(wrapper.state('saving')).toBe(true);
    });
  });
});
