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
				<div>
					<Navigation />
					<div className="grid-frame">
						<div className="grid-block vertical">
							{this.props.children}
						</div>
					</div>
				</div>

		)
	}
};
// TODO: FOOTER
