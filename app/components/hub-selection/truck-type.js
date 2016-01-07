import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection';
import * as constants from '../../config/constants';
import { updateFilters } from 'actions';
import { pushPath } from 'redux-simple-router'
import { connect } from 'react-redux'

const HEAVY_DUTY_TRUCK=1
const TRAILER=2

 class TruckType extends Component {

	setHub(key, val) {
		const { hub, setHubState, dispatch } = this.props;
		var newObj = {};
		newObj[key] = val;
		setHubState(newObj);
	}

  goToNext() {
    const { hub, setHubState, dispatch } = this.props;
    if (hub.truckCompartmentIds === TRAILER) {
      setHubState({truckMakeIds: '~'})
      dispatch(pushPath('/hub-selection/wheel-type'));
    } else {
      dispatch(pushPath('/hub-selection/truck-make'));
    }

  }

	render() {
		const { hub, setHubState } = this.props;

		return (
			<div className="grid-container main-content">
				<h1>Choose the Truck or Trailer Type</h1>

				<div className="cm-button-group">
					<h2>Truck Type</h2>
						<ul className="button-group segmented" id="truckType">
							<li className={hub.truckCompartmentIds === 1 ? 'is-active' : ''}>
								<a href="javascript: void(0);" onClick={this.setHub.bind(this, 'truckCompartmentIds', HEAVY_DUTY_TRUCK)} id="heavyDuty">Heavy-Duty</a>
							</li>
							{/*}<li className={this.hub.truckMakeIds === 'mediumDuty' ? 'is-active' : ''}>
								<a href="javascript: void(0);" onClick={this.setTruckType.bind(this, 'mediumDuty')} id="mediumDuty">Medium-Duty</a>
							</li>*/}
							<li className={hub.truckCompartmentIds === 2 ? 'is-active' : ''}>
								<a href="javascript: void(0);" onClick={this.setHub.bind(this, 'truckCompartmentIds',TRAILER)} id="trailer">Trailer</a>
							</li>
						</ul>
					</div>

          <div className="conmet-button">
  					<a href="#" onClick={this.goToNext.bind(this)}><strong>Continue</strong> <i className="icon-angle-right"></i></a>
  				</div>


					{/* <div className="cm-button-group">
					// <h2>Brake Type</h2>
					// 	<ul className="button-group segmented">
					// 		<li className={hub.brakeTypeIds  === 1 ? 'is-active' : ''}>
					// 			<a href="javascript: void(0);" onClick={this.setHub.bind(this, 'brakeTypeIds', 1)}>Drum Brakes</a>
					// 		</li>
					// 		{/*<li className={hub.brakeTypeIds  === 2 ? 'is-active' : ''}>
					// 			<a href="javascript: void(0);" onClick={this.setHub.bind(this, 'brakeTypeIds', 2)}>Disk Brakes</a>
					// 		</li>
					// 	</ul>
					// </div>
          */}
			</div>


		)
	}
};
export default connect()(TruckType);
