import React, { PropTypes, Component } from 'react';
import { Router, Route, Link, IndexRoute } from 'react-router';

export default class Splash extends Component {
	constructor(props) {
		super(props)
		this.state = { history: props.history }
	}

	componentDidMount() {
		setTimeout(() => {
			this.state.history.push('/hub-selection');
			this.state.history.go();
		}, 2000);
	}

	render() {
		return (
			<div className="grid-block align-center">
				<h2 className="text-center">
					Spash Page
				</h2>
			</div>
		)
	}
};
