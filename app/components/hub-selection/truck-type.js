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
		const { hub, setHubState, dispatch, incrStep} = this.props;
		var newObj = {};
		newObj[key] = val;
		setHubState(newObj);
    this.goToNext(newObj)
	}

  componentDidMount() {
		const {setStep} = this.props;
	}

  goToNext(updatedObject) {
    const { hub, setHubState, dispatch, incrStep } = this.props;
    incrStep()
    if (updatedObject.truckCompartmentIds === TRAILER) {
      setHubState({truckMakeIds: '~'})
      dispatch(pushPath('/hub-selection/axel-type'));
    } else {
      dispatch(pushPath('/hub-selection/truck-make'));
    }

  }

  setActive(selected) {
		const {hub} = this.props;
		const baseClass = 'conmet-button'
		// if (hub.truckCompartmentIds === selected) {
		// 	return baseClass + ' active';
		// }
		return baseClass;
	}

	render() {
		const { hub, setHubState } = this.props;

		return (
			<div className="grid-container main-content">
				<h1>Are you looking for a hub for your</h1>

        <div className="grid-block">
          <div className="grid-content small-6">
          <div className={this.setActive(HEAVY_DUTY_TRUCK)}>
            <button className="yes-no-button" onClick={this.setHub.bind(this, 'truckCompartmentIds', HEAVY_DUTY_TRUCK)}>
              <strong>Heavy-Duty Truck with Drum Brakes</strong>
            </button>
          </div>
          <div className="conmet-button disabled">
  					<button className="yes-no-button">
              <strong>Heavy-Duty Truck with Disc Brakes</strong>
  					</button>
  				</div>

          </div>
          <div className="grid-content small-6">
            <div className={this.setActive(TRAILER)}>
              <button className="yes-no-button" onClick={this.setHub.bind(this, 'truckCompartmentIds', TRAILER)}>
                <strong>Trailer with Drum Brakes</strong>
              </button>
            </div>

          <div className="conmet-button disabled">
  					<button className="yes-no-button">
              <strong>Trailer with Disc Brakes</strong>
  					</button>
  				</div>
        </div>
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
