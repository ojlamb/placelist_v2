import React from 'react';

import App from '../App';

import { Root } from '../Root';

const getProps = () => ({
  store: {
    dispatch: jest.fn(),
    getState: jest.fn(),
    subscribe: jest.fn(),
  },
  history: {}
});

const getJSX = () => (<Root {...getProps()} />);

describe('Root View', () => {
  describe('rendering', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = shallow(getJSX());
    });

    describe('elements', () => {
      it('contains App', () => {
        expect(wrapper.find(App)).toHaveLength(1);
      });
    });
  });
});
