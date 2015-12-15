import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection';

import {Link} from 'react-router';

export default class extends Component {
	constructor(props) {
		super(props);
		this.state = {
			truckType: 'heavyDuty',
			brakeType: 'drumBrakes'
		};
	}

	setTruckType(val) {
		this.setState({truckType: val});
		console.log('here', this.state);
	}

	setBrakeType(val) {
		this.setState({brakeType: val });
		console.log(this.state);
	}

	render() {
		return (
			<HubSelection>
				<h1>Choose the Truck or Trailer Type</h1>

				<div className="cm-button-group">
					<h2>Truck Type</h2>
						<ul className="button-group segmented" id="truckType">
							<li className={this.state.truckType === 'heavyDuty' ? 'is-active' : ''}>
								<a href="javascript: void(0);" onClick={this.setTruckType.bind(this, 'heavyDuty')} id="heavyDuty">Heavy-Duty</a>
							</li>
							<li className={this.state.truckType === 'mediumDuty' ? 'is-active' : ''}>
								<a href="javascript: void(0);" onClick={this.setTruckType.bind(this, 'mediumDuty')} id="mediumDuty">Medium-Duty</a>
							</li>
							<li className={this.state.truckType === 'trailer' ? 'is-active' : ''}>
								<a href="javascript: void(0);" onClick={this.setTruckType.bind(this, 'trailer')} id="trailer">Trailer</a>
							</li>
						</ul>
					</div>


					<div className="cm-button-group">
					<h2>Brake Type</h2>
						<ul className="button-group segmented">
							<li className={this.state.brakeType === 'drumBrakes' ? 'is-active' : ''}>
								<a href="javascript: void(0);" onClick={this.setBrakeType.bind(this, 'drumBrakes')}>Drum Brakes</a>
							</li>
							<li className={this.state.brakeType === 'diskBrakes' ? 'is-active' : ''}>
								<a href="javascript: void(0);" onClick={this.setBrakeType.bind(this, 'diskBrakes')}>Disk Brakes</a>
							</li>
						</ul>
					</div>



			</HubSelection>
		)
	}
};
