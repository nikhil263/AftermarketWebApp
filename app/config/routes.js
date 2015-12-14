import React from 'react'
import Main from 'components/main'
import Splash from 'components/splash'
import {render} from 'react-dom'
import { Router, Route, RouteHandler, Redirect, IndexRoute } from 'react-router';

module.exports = (
	<Route path="/" component={Main}>
				<IndexRoute component={Splash}/>
    </Route>
);
