import React from 'react';
import theme from 'test/theme';
import { SignupView, styles } from '../SignUp.view';

const getProps = () => ({
  classes: {},
  actions: {
    createUser: jest.fn()
  },
  history: {
    push: jest.fn()
  }
});

const getJSX = props => (<SignupView {...getProps(props)} />);

describe('SignupView', () => {
  describe('styles', () => {
    it('matches snapshot', () => {
      expect(styles(theme)).toMatchSnapshot();
    });
  });
  describe('snapshots', () => {
    const scenarios = [
      { },
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
      wrapper = shallow(<SignupView {...getProps()} />);
      instance = wrapper.instance();
    });
    it('updates the state for new user', () => {
      instance.onChange({ target: { name: 'name', value: 'FOO' } });
      const user = wrapper.state('user');
      expect(user.name).toEqual('FOO');
    });

    it('updates the state when creating a user', () => {
      const createUser = jest.spyOn(instance, 'onSave');
      instance.onSave({ preventDefault: jest.fn() });
      expect(createUser).toHaveBeenCalled();
      expect(wrapper.state('user')).not.toBe(null);
    });
  });
});
