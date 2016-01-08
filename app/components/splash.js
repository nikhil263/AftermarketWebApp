import React, { PropTypes, Component } from 'react';
import { Router, Route, Link, IndexRoute } from 'react-router';
import Spinner from './global/spinner'

export default class Splash extends Component {
	constructor(props) {
		super(props)
		this.state = { history: props.history }
	}

	componentDidMount() {
		setTimeout(() => {
			this.state.history.push('/hub-selection');
			this.state.history.go();
		}, 1500);
	}

	render() {
		return (
			<div className="grid-frame vertical splash">
			<div className="grid-block align-center shrink">
				<div className="grid-container splash-title">
				<h3>Welcome to the</h3>
				<h1 className="text-center">ConMet<br />Aftermarket</h1>
				<h3>Service Parts & Replacement Hubs</h3>
				<Spinner isFetching={true}/>

				</div>
			</div>
			<div className="grid-block align-center"></div>
			<div className="grid-block align-center shrink splash-footer">
				<div id="logo"><img src={require('../images/logo.svg')} alt="ConMet"/></div>
			</div>
			<div className="grid-block align-center"></div>
			</div>
		)
	}
};
