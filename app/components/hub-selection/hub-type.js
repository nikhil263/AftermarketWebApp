import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection'
import { Link } from 'react-router';

export default class extends Component {
	render() {
		return (
			<div className="grid-container main-content">
				<h1>Choose the Hub Type by Bearing Part or Set Number:</h1>

				<div className="conmet-button">
					<Link to="/hub-selection/gawr" className="yes-no-button"><strong>FF FRONT AXLE</strong><br />
						INNER BEARING - HM212011PS / HM212049 PS<br/>
					(SET 427 OR SET 413)<br />
				<br />
				OUTER BEARING - 3720 PS / 3782 PS<br />
						(SET 428 OR SET 406)
					</Link>
				</div>
				<div className="conmet-button">
					<Link to="/hub-selection/gawr" className="yes-no-button">
						<strong>FL FRONT AXLE</strong><br />
							INNER BEARING - HM212011PS / HM212049 PS<br />
							(SET 427 OR SET 413)<br />
					<br />
						OUTER BEARING - 3720 PS / 3782 PS<br />
						(SET 428 OR SET 406)
					</Link>
				</div>

				<div className="conmet-button">
					<Link to="/hub-selection/gawr" className="yes-no-button">
						<strong>R DRIVE AXLE</strong><br />
							INNER BEARING - HM212011PS / HM212049 PS<br />
							(SET 427 OR SET 413)<br />
					<br />
						OUTER BEARING - 3720 PS / 3782 PS<br />
						(SET 428 OR SET 406)
					</Link>
				</div>


			</div>
		)
	}
};
