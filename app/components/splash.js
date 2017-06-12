import React, { PropTypes, Component } from 'react';
import { Router, Route, Link, IndexRoute } from 'react-router';
import Spinner from './global/spinner'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import Cookies from 'universal-cookie';

class Splash extends Component {
	constructor(props) {
		super(props)
		this.state = { history: props.history }
	}
	handleClick() {
		const { dispatch, app } = this.props
		const cookies = new Cookies();
		cookies.set('accepted', true, { path: '/' });
		dispatch(pushPath('/hub-selection'))
	}

	componentDidMount() {
		const { dispatch, app } = this.props
		const cookies = new Cookies();
		const accepted = cookies.get('accepted');
		if (accepted) {
			dispatch(pushPath('/hub-selection'))
		}

		// setTimeout(() => {
		// 	this.state.history.push('/hub-selection');
		// 	this.state.history.go();
		// }, 1500);
	}

	render() {
		return (
			<div className="grid-frame vertical splash">
			<div className="grid-block align-center">
				<div className="grid-container">

					<div className="grid-content splash-title">

				<h3>Welcome to the</h3>
				<h1 className="text-center">ConMet<br />Aftermarket</h1>
				<h3>Service Parts & Replacement Hubs</h3>
				<div className="disclaimer">
				<p><Link to="/hub-selection">I Accept the disclaimer below</Link></p>
				<p>ConMet is the leading supplier of wheel end technology for commercial vehicles in North America. This app is intended to direct the distributor and/or end-user to a readily available aftermarket replacement component or wheel end assembly.</p>

				<p>Due to the variety of vehicle applications and part numbers we supply to the original equipment manufacturers, this app is not all inclusive. In some cases this app will not have a reference to a direct aftermarket replacement part number. In that instance, we will direct you to our customer service team who can assist with finding the correct service part or wheel end assembly required to get the vehicle back in service.</p>

				<p>CAUTION: As you are guided through the app, it is important that you verify your responses. Failure to do so could result in the wrong service part or hub assembly recommendation. Wheel hubs are a safety critical component and installing the wrong component or assembly on a vehicle can result in premature failure.</p>
				<a href="javascript:void(0)" onClick={this.handleClick.bind(this)} className="general-button">Accept</a>
				</div>
				</div>
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
export default connect()(Splash)
