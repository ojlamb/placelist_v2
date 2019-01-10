import React from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


import Home from 'pages/Home';
import Header from 'components/Header';
import Login from 'pages/Login';
import Signup from 'pages/SignUp';
import Places from 'pages/Places';
import PlaceDetail from 'pages/PlaceDetail';
import Map from 'pages/Map';
import style from '../../styles';

library.add(faStroopwafel);

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

const theme = createMuiTheme(style);

export const App = () => ((
  <div className="app-wrapper">
    <Helmet
      titleTemplate="%s - PlaceList"
      defaultTitle="PlaceList"
    >
      <meta name="description" content="PlaceList" />
    </Helmet>
    <MuiThemeProvider theme={theme}>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/places" component={Places} />
        <Route path="/map" component={Map} />
        <Route path="/place/:id" component={PlaceDetail} />
      </Switch>
    </MuiThemeProvider>
  </div>
));

export default hot(module)(App);
