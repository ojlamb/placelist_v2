import React from 'react';
import { Helmet } from 'react-helmet';
import { Route } from 'react-router-dom';

import { App } from '../App.view';

const getJSX = () => (<App />);

describe('App View', () => {
  describe('rendering', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = shallow(getJSX());
    });

    describe('elements', () => {
      it('contains a helmet', () => {
        expect(wrapper.find(Helmet)).toHaveLength(1);
      });
    });

    describe('Routes', () => {
      it('has the correct number of routes', () => {
        expect(wrapper.find(Route)).toHaveLength(6);
      });
    });
  });
});
