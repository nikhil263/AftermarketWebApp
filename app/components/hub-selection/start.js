import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import HubSelection from 'components/hub-selection'
import {updateLastPage} from 'actions'
import { pushPath } from 'redux-simple-router'
import { connect } from 'react-redux'

class Start extends Component {
	static contextTypes = {
		store: PropTypes.object,
  	history: PropTypes.object
  };

	handleClick(path) {
		const { dispatch } = this.props;
		dispatch(pushPath(path));
	}

	handleLink(url) {
		window.location = url;
	}


	render() {

		const { dispatch } = this.context.store;

		return (

			<div className="grid-container main-content">
				<h1>What are you looking for?</h1>

				<div className="btn-no-description conmet-button">
					<button onClick={this.handleClick.bind(this,'/hub-selection/choose-path')} store={this.context.store}>
					<h2>HUBS <i className="icon-angle-right"></i></h2>
					</button>
				</div>
				<div className="btn-no-description conmet-button">
					<button onClick={this.handleClick.bind(this,'/parts/choose-path')} store={this.context.store}>
					<h2>HUB COMPONENTS <i className="icon-angle-right" title="Right Arrow"></i></h2>
					</button>
				</div>
				<div className="btn-no-description conmet-button">
					<button onClick={this.handleLink.bind(this,'https://drums.conmetwheelends.com/')} store={this.context.store}>
					<h2>BRAKE DRUMS <i className="icon-angle-right" title="Right Arrow"></i></h2>
					</button>
				</div>
				<div className="btn-no-description conmet-button">
					<button onClick={this.handleLink.bind(this,'https://www.conmet.com/wp-content/uploads/2017/04/Rotor-Flyer-FINAL-040317.pdf')} store={this.context.store}>
					<h2>BRAKE ROTORS <i className="icon-angle-right" title="Right Arrow"></i></h2>
					</button>
				</div>





			</div>
		)
	}
};
//this.handleClick.bind(this,'/parts/search')
export default connect()(Start)
