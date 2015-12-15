import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection'
import { Link } from 'react-router';

export default class extends Component {
	render() {
		return (
			<HubSelection>
				<h1>Do you know your hub's  assembly number?</h1>
				<div className="conmet-button">
					<Link to="/hub-selection/step-three" className="yes-no-button"><em>Yes</em>I know the hub assembly number.</Link>
				</div>
				<div className="conmet-button">
					<Link to="/hub-selection/step-three" className="yes-no-button">
						<em>No</em>Help me find the assembly number.</Link>
				</div>
				<div className="conmet-button">
					<Link to="/hub-selection/step-three" className="yes-no-button">
						<em>No</em>Proceed without the number.</Link>
				</div>


			</HubSelection>
		)
	}
};
