/* eslint-disable import/default */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore, { history } from './store/configureStore';
import Root from './entry/Root';

import './web.config';

// import { loadConfig } from 'actions/config.actions';

import './styles/styles.scss';

require('./favicon.ico');

const store = configureStore();
// store.dispatch(loadConfig());

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./entry/Root', () => {
    const NewRoot = require('./entry/Root').default;
    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
