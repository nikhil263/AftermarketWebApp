import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import HubSelection from 'components/hub-selection'
import {updateLastPage} from 'actions'

export default class extends Component {
	static contextTypes = {
		store: PropTypes.object,
  	history: PropTypes.object
  };



	render() {

		const { dispatch } = this.context.store;

		return (

			<div className="grid-container main-content">


					<h1>What are you looking for?</h1>

					<div className="conmet-button big-button">
						<Link to="/hub-selection/choose-path" store={this.context.store}>
						<h2>REPLACEMENT HUB</h2>
						<i className="icon-angle-right"></i>
						<p>Replace your hub with one of our kits</p>
						</Link>
					</div>
					<div className="conmet-button big-button disabled">
						<a href="javascript:void(0)" store={this.context.store}>
						<h2>REPLACEMENT PARTS</h2>
						<i className="icon-angle-right" title="Right Arrow"></i>
						<p><strong>Coming Soon!</strong> <em>Replace your hub with one of our kits</em></p>
						</a>
					</div>


		</div>
		)
	}
};
