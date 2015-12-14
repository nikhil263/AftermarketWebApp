import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection'

export default class extends Component {
	render() {
		return (
			<HubSelection>
				<div className="grid-block align-center wrap">
					<div className="grid-content small-12">
							<h3>Do you know your hub's assembly number?</h3>
					</div>
				</div>
				<div className="grid-block align-center wrap">
					<div className="grid-content small-12">
						<div className="conmet-button yes-no-button v-align">
							<h4>Yes</h4>
							<p className="align-center">I know the hub assembly number.</p>
						</div>
						<div className="conmet-button yes-no-button v-align">
							<h4>No</h4>
							<p className="align-center">Help me find the assembly number.</p>
						</div>
						<div className="conmet-button yes-no-button v-align">
							<h4>No</h4>
							<p className="align-center">Proceed without the number.</p>
						</div>
					</div>
			</div>
			</HubSelection>
		)
	}
};
