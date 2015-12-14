import React, { PropTypes, Component } from 'react';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Router, Route, Link, IndexRoute } from 'react-router';

import Main from 'components/main'
import Splash from 'components/splash'
import HubSelectionStart from 'components/hub-selection/step-one'
import HubSelectionTwo from 'components/hub-selection/step-two'
import HubSelectionThree from 'components/hub-selection/step-three'
import HubSelectionFour from 'components/hub-selection/step-four'
import About from 'components/about'
import Contact from 'components/contact'

export default class Root extends Component {
  render() {
    return (
			<Router history={createBrowserHistory()}>
        <Route path='/' component={Main}>
          <IndexRoute component={Splash} />
					<Route path='about' component={About} />
					<Route path='contact' component={Contact} />
          <Route path='hub-selection' component={HubSelectionStart} />
          <Route path='hub-selection/step-two' component={HubSelectionTwo} />
          <Route path='hub-selection/step-three' component={HubSelectionThree} />
          <Route path='hub-selection/step-four' component={HubSelectionFour} />
        </Route>
      </Router>
    );
  }
}
