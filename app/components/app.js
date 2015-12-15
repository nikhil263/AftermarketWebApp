import React, { PropTypes, Component } from 'react';
import { Router, Route, Link, IndexRoute } from 'react-router';

import Navigation from 'components/navigation'
export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {  }
	}

	componentDidMount() {

	}

	render() {
		return (
			<div className="grid-frame vertical">
			<Navigation />
			<div className="grid-block vertical align-center">
				{this.props.children}
			</div>
			<div className="grid-block align-center footer shrink">
				<div className="grid-content small-12">
					<p className="">© 2015 ConMet <br />
						<small><a href="http://www.conmet.com" target="_blank">www.ConMet.com</a></small>
				</p>
				</div>
			</div>
			</div>
			)
	}
};
