import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom'
import {createHistory } from 'history';
import { syncReduxAndRouter } from 'redux-simple-router'
import configureStore from 'config/store';
const GA_TRACKING_ID = 'UA-117509246-1';
const store = configureStore();
const history = createHistory();

syncReduxAndRouter(history, store);
const historyChangeHandler = function (history) {
    history.listen(function(location) {
        gtag('config', GA_TRACKING_ID, {
            'page_path': location.pathname
        });
    });
};

historyChangeHandler(history);

import Root from 'containers/root'

import 'styles/app.scss';

if (Function('/*@cc_on return document.documentMode===10@*/')()){
    document.documentElement.className+=' ie10';
}

render(<Root store={store} history={history} />, document.getElementById('app'));
