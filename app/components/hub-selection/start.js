import React, { PropTypes, Component } from 'react';
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
					<button onClick={this.handleClick.bind(this,'/hub-selection/replacement-drum')} store={this.context.store}>
						<h2>BRAKE DRUMS <i className="icon-angle-right"></i></h2>
					</button>
				</div>
				<div className="btn-no-description conmet-button">
					<button onClick={this.handleClick.bind(this,'/hub-selection/replacement-rotor')} store={this.context.store}>
					<h2>BRAKE ROTORS <i className="icon-angle-right" title="Right Arrow"></i></h2>
					</button>
				</div>





			</div>
		)
	}
};
//this.handleClick.bind(this,'/parts/search')
export default connect()(Start)
