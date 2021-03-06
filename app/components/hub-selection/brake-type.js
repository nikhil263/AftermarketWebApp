import React, { PropTypes, Component } from 'react'
import HubSelection from 'components/hub-selection'
import * as constants from '../../config/constants'
import { pushPath } from 'redux-simple-router'
import { connect } from 'react-redux'
import { setActiveFilterValue, fetchFilters, resetAppState } from 'actions/filters'

const FILTERIDX=15
const NEXT_FILTER_PATH = '/hub-selection/truck-type'

 class BrakeType extends Component {


   componentDidMount() {
     const {dispatch } = this.props
     dispatch(resetAppState())

   }

  render() {


		const { app, setFilter, setActive } = this.props;

		return (
			<div className="grid-container main-content">
				<h2>What type of brakes do you have?</h2>

        <div className="grid-block">
          <div className="grid-content small-6">
          <div className={setActive(FILTERIDX, HEAVY_DUTY_TRUCK)}>
            <button className="yes-no-button" onClick={setFilter.bind(this, FILTERIDX, HEAVY_DUTY_TRUCK, app)}>
              <strong>Truck with Drum Brakes</strong>
            </button>
          </div>

					<div className={setActive(FILTERIDX, HEAVY_DUTY_TRUCK)}>
            <button className="yes-no-button" onClick={setFilter.bind(this, FILTERIDX, HEAVY_DUTY_TRUCK, app)}>
              <strong>Truck with Disc Brakes</strong>
            </button>
          </div>

					</div>
          <div className="grid-content small-6">
            <div className={setActive(FILTERIDX, TRAILER)}>
              <button className="yes-no-button" onClick={setFilter.bind(this, FILTERIDX, TRAILER, app)}>
                <strong>Trailer with Drum Brakes</strong>
              </button>
            </div>
						<div className={setActive(FILTERIDX, TRAILER)}>
              <button className="yes-no-button" onClick={setFilter.bind(this, FILTERIDX, TRAILER, app)}>
                <strong>Trailer with Drum Brakes</strong>
              </button>
            </div>

          {/* <div className="conmet-button disabled">
  					<button className="yes-no-button">
              <strong>Trailer with Disc Brakes</strong><br />Coming Soon
  					</button>
  				</div> */}
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
