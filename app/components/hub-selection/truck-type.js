import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection';
import * as constants from '../../config/constants';
import { updateFilters } from 'actions';
import { pushPath } from 'redux-simple-router'
import { connect } from 'react-redux'


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
							<li className={hub.truckCompartmentIds === 1 ? 'is-active' : ''}>
								<a href="javascript: void(0);" onClick={this.setHub.bind(this, 'truckCompartmentIds', 1)} id="heavyDuty">Heavy-Duty</a>
							</li>
							{/*}<li className={this.hub.truckMakeIds === 'mediumDuty' ? 'is-active' : ''}>
								<a href="javascript: void(0);" onClick={this.setTruckType.bind(this, 'mediumDuty')} id="mediumDuty">Medium-Duty</a>
							</li>*/}
							<li className={hub.truckCompartmentIds === 2 ? 'is-active' : ''}>
								<a href="javascript: void(0);" onClick={this.setHub.bind(this, 'truckCompartmentIds',2)} id="trailer">Trailer (no data)</a>
							</li>
						</ul>
					</div>


					<div className="cm-button-group">
					<h2>Brake Type</h2>
						<ul className="button-group segmented">
							<li className={hub.brakeTypeIds  === 1 ? 'is-active' : ''}>
								<a href="javascript: void(0);" onClick={this.setHub.bind(this, 'brakeTypeIds', 1)}>Drum Brakes</a>
							</li>
							{/*<li className={hub.brakeTypeIds  === 2 ? 'is-active' : ''}>
								<a href="javascript: void(0);" onClick={this.setHub.bind(this, 'brakeTypeIds', 2)}>Disk Brakes</a>
							</li> */}
						</ul>
					</div>

			</div>


		)
	}
};
export default connect()(TruckType);
