import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import HubSelection from 'components/hub-selection'

export default class extends Component {


	render() {
		return (
			<HubSelection>


					<h1>What are you looking for?</h1>

					<div className="conmet-button big-button">
						<Link to="/hub-selection/step-two">
						<h2>Replacement Hub</h2>
						<i className="icon-angle-right"></i>
						<p>Replace your hub with one of our kits</p>
						</Link>
					</div>
					<div className="conmet-button big-button">
						<Link to="/hub-selection/step-two">
						<h2>Replacement Parts</h2>
						<i className="icon-angle-right" title="Right Arrow"></i>
						<p>Replace your hub with one of our kits</p>
						</Link>
					</div>


		</HubSelection>
		)
	}
};
