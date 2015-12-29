import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection'
import { Link } from 'react-router';

export default class extends Component {
	render() {
		const {history} = this.props;
		return (
			<div className="grid-container main-content">
				<h1>Choose the Wheel Type<br />(Determine Wheel Stud Length):</h1>

				<div className="conmet-button">
					<Link to="/hub-selection/step-four" className="yes-no-button"><strong>Steel Wheels</strong><br />
						(Short Studs)
					</Link>
				</div>

				<div className="conmet-button">
				<Link to="/hub-selection/step-four" className="yes-no-button"><strong>Aluminum Wheels</strong><br />
					(Long Studs)
				</Link>
				</div>

				<div className="conmet-button">
					<Link to="/hub-selection/step-four" className="yes-no-button"><strong>I Don’t Know</strong></Link>
				</div>
			</div>
		)
	}
};
