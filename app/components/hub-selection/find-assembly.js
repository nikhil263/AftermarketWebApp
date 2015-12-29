import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection'
import { Link } from 'react-router';

export default class extends Component {
	render() {
		return (
			<div className="grid-container main-content">
				<h1>Do you know your hub's  assembly number?</h1>

				<iframe width="100%" height="auto" src="https://www.youtube.com/embed/q0RggNhTSiY?frameborder=0&allowfullscreen=true" ></iframe>
				<div className="conmet-button">
					<Link to="/hub-selection/search" className="yes-no-button"><em>Yes</em>I know my number now.</Link>
				</div>
				<div className="conmet-button">
					<Link to="/hub-selection/truck-type" className="yes-no-button">
						<em>No</em>I still don't know, proceed without it.</Link>
				</div>


			</div>
		)
	}
};
