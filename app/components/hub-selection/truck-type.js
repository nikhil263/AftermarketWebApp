import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection';
import * as constants from '../../config/constants';
import { updateFilters } from 'actions';
import { pushPath } from 'redux-simple-router'
import { connect } from 'react-redux'

import {Link} from 'react-router';

 class TruckType extends Component {

	setHub(key, val) {
		const { hub, setHubState, dispatch } = this.props;
		var newObj = {};
		newObj[key] = val;
		setHubState(newObj);
		dispatch(pushPath('/hub-selection/truck-make'));
	}

	render() {
		const { hub, setHubState } = this.props;
		console.log('hub', hub);
		return (
			<div className="grid-container main-content">
				<h1>Choose the Truck or Trailer Type</h1>

				<div className="cm-button-group">
					<h2>Truck Type</h2>
						<ul className="button-group segmented" id="truckType">
							<li className={hub.truckCompartmentIds === 'heavyDuty' ? 'is-active' : ''}>
								<a href="javascript: void(0);" onClick={this.setHub.bind(this, 'truckCompartmentIds', 'heavyDuty')} id="heavyDuty">Heavy-Duty</a>
							</li>
							{/*}<li className={this.hub.truckMakeIds === 'mediumDuty' ? 'is-active' : ''}>
								<a href="javascript: void(0);" onClick={this.setTruckType.bind(this, 'mediumDuty')} id="mediumDuty">Medium-Duty</a>
							</li>*/}
							<li className={hub.truckCompartmentIds === 'trailer' ? 'is-active' : ''}>
								<a href="javascript: void(0);" onClick={this.setHub.bind(this, 'truckCompartmentIds','trailer')} id="trailer">Trailer</a>
							</li>
						</ul>
					</div>


					<div className="cm-button-group">
					<h2>Brake Type</h2>
						<ul className="button-group segmented">
							{/*}<li className={hub.brakeTypeIds  === 'drumBrakes' ? 'is-active' : ''}>
								<a href="javascript: void(0);" onClick={this.setHub.bind(this, 'brakeTypeIds', 'drumBrakes')}>Drum Brakes</a>
							</li> */}
							<li className={hub.brakeTypeIds  === 'diskBrakes' ? 'is-active' : ''}>
								<a href="javascript: void(0);" onClick={this.setHub.bind(this, 'brakeTypeIds', 'diskBrakes')}>Disk Brakes</a>
							</li>
						</ul>
					</div>

			</div>


		)
	}
};
export default connect()(TruckType);
