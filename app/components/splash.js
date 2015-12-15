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
		}, 4000);
	}

	render() {
		return (
			<div className="grid-frame vertical splash">
			<div className="grid-block align-center shrink">
				<div className="grid-container splash-title">
				<h3>Welcome to the</h3>
				<h1 className="text-center">ConMet<br />Aftermarket</h1>
				<h3>Service Parts & Replacement Hubs</h3>
					<div className="conmet-button center show-for-medium">
						<Link to="/hub-selection" className="yes-no-button">Enter</Link>
					</div>
				</div>
			</div>
			<div className="grid-block align-center"></div>
			<div className="grid-block align-center shrink splash-footer">
				<div id="logo"><img src={require('../images/logo.svg')} alt="ConMet"/></div>
			</div>
			</div>
		)
	}
};
