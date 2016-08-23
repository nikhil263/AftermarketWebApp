import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom'
import { Provider } from 'react-redux';
import {createHistory } from 'history';
import { syncReduxAndRouter } from 'redux-simple-router'
import configureStore from 'config/store';

const store = configureStore();
const history = createHistory();

syncReduxAndRouter(history, store)

import Root from 'containers/root'

import 'styles/app.scss';

if (Function('/*@cc_on return document.documentMode===10@*/')()){
    document.documentElement.className+=' ie10';
}

render(<Root store={store} history={history} />, document.getElementById('app'))
