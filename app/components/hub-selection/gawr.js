import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection'
import { Link } from 'react-router';

export default class extends Component {
	render() {
		return (
			<div className="grid-container main-content">
				<h1>Choose the GAWR <br />(Gross Axle Weight Rating):</h1>

				<div className="conmet-button">
					<Link to="/hub-selection/wheel-type" className="yes-no-button"><strong>12,000 - 13,200 lbs.</strong><br />
						(540 - 600 kg)
					</Link>
				</div>

				<div className="conmet-button">
					<Link to="/hub-selection/wheel-type" className="yes-no-button"><strong>More than 13,200 lbs.</strong><br />
						(More than 600 kg)
					</Link>
				</div>

				<div className="conmet-button">
					<Link to="/hub-selection/wheel-type" className="yes-no-button"><strong>I Don’t Know</strong></Link>
				</div>
			</div>
		)
	}
};
