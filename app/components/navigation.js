import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'
import { pushPath } from 'redux-simple-router'
import {resetFilters} from 'actions'
import {slide} from 'react-burger-menu';

var Menu = slide

class Navigation extends Component {
	constructor(props) {
		super(props)
        this.state = {isOpen: false};
	}

	goHome() {
		const {dispatch} = this.props
		dispatch(resetFilters())
		dispatch(pushPath('/hub-selection'))
	}

	goDisclaimer() {
		const {dispatch} = this.props
		dispatch(resetFilters())
		dispatch(pushPath('/disclaimer'))
		this.setState({
            isOpen: false
		});
	}


	render() {
		return (
			<div>
				<Menu className="global-navigation" right isOpen={this.state.isOpen}>
					<p>More Information</p>
					<ul>
						<li><a href="http://www.conmet.com/contact-us/">Contact ConMet</a></li>
						<li><a href="http://www.conmet.com/">Visit ConMet.com</a></li>
						<li><a href="http://www.conmet.com/general/literature/">Service Literature</a></li>
						<li><a href="http://calculator.conmetwheelends.com/">Replace Calculator</a></li>
						<li><a onClick={this.goDisclaimer.bind(this)}>Disclaimer</a></li>
						<li><a href="https://conmet.com/privacy/">Privacy Policy</a></li>
						<li><a href="https://www.conmet.com/training">Hub Training 2.0</a></li>
					</ul>
				</Menu>

				<div className="dark title-bar">


					<div className="left title">
						<div id="logo"><a href="#" onClick={this.goHome.bind(this)}><img src={require('../images/logo.svg')} alt="ConMet"/></a></div>
					</div>

					<span className="right">

					</span>
				</div>
			</div>

		);
	}
};
export default connect()(Navigation)
