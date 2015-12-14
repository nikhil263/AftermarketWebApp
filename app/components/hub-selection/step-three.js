import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection'

export default class extends Component {
	render() {
		return (
			<HubSelection>
				<div className="grid-block align-center wrap">
					<div className="grid-content small-12">
							<h3>Enter your hub assembly number</h3>
					</div>
				</div>
				<div className="grid-block align-center wrap">
					<div className="grid-content small-12">
						<div className="error">
						 <p>Please enter a valid 8-digit assembly number</p>
						</div>
						<form>
							<label>
							Input Label
							<input type="text" placeholder="Text field" />
							</label>
							<button>Continue</button>
						</form>
					</div>
			</div>
			</HubSelection>
		)
	}
};
