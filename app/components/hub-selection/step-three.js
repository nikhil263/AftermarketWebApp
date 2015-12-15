import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection'

export default class extends Component {
	render() {
		return (
			<HubSelection>
				<h1>Enter your hub assembly number</h1>
				<div className="error">
				 <p>Please enter a valid 8-digit assembly number</p>
				</div>
				<form>
					<input className="assembly-number" type="text" placeholder="8 digit assembly number" />
					<button className="button general-button">Continue</button>
				</form>
			</HubSelection>
		)
	}
};
