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


	render() {

		const { dispatch } = this.context.store;

		return (

			<div className="grid-container main-content">
				<h1>What are you looking for?</h1>

				<div className="conmet-button big-button">
					<button onClick={this.handleClick.bind(this,'/hub-selection/choose-path')} store={this.context.store}>
					<h2>REPLACEMENT HUB</h2>
					<i className="icon-angle-right"></i>
					<p>Replace your hub with one of our OEM approved hub assemblies</p>
					</button>
				</div>
				<div className="conmet-button big-button">
					<button onClick={this.handleClick.bind(this,'/parts/search')} store={this.context.store}>
					<h2>REPLACEMENT PARTS</h2>
					<i className="icon-angle-right" title="Right Arrow"></i>
					<p>Service your hub with genuine ConMet service parts</p>
					</button>
				</div>



			</div>
		)
	}
};
//this.handleClick.bind(this,'/parts/search')
export default connect()(Start)
