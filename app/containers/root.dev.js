import React, { PropTypes, Component } from 'react';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, Link, IndexRoute } from 'react-router';
import routes from 'config/routes'
import DevTools from '../containers/dev-tools'
export default class Root extends Component {
  render() {
    const { store, history } = this.props;

    return (
      <Provider store={store} history={history}>
        <div>
          <Router history={history}>
            {routes}
          </Router>
        </div>
      </Provider>
    );
  }
}
