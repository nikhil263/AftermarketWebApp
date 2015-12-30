import React, { PropTypes, Component } from 'react';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, Link, IndexRoute } from 'react-router';
import routes from 'config/routes'

export default class Root extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store} >
        <Router history={history}>
            {routes}
          </Router>
      </Provider>
    );
  }
}
