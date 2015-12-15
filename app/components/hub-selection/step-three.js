import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection'

export default class extends Component {
	render() {
		return (
			<HubSelection>
				<div className="grid-block align-center small-12">
					<div className="grid-content">
							<h3>Enter your hub assembly number</h3>
					</div>
				</div>
				<div className="grid-block align-center small-12">
					<div className="grid-content">
						<div className="error">
						 <p>Please enter a valid 8-digit assembly number</p>
						</div>
						<form>
							<input className="assembly-number" type="text" placeholder="8 digit assembly number" />
							<button className="button large">Continue</button>
						</form>
					</div>
			</div>
			</HubSelection>
		)
	}
};
