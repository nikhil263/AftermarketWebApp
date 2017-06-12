import React, { PropTypes, Component } from 'react'
import HubSelection from 'components/hub-selection'
import * as constants from '../../config/constants'
import { pushPath } from 'redux-simple-router'
import { connect } from 'react-redux'
import { setActiveFilterValue, fetchFilters, resetAppState } from 'actions/filters'

const TRUCK=1
const TRAILER=2
const DISC=2
const DRUM=1

const FILTERIDX=2
const NEXT_FILTER_PATH = '/hub-selection/truck-make'

 class TruckType extends Component {


   componentDidMount() {
     const {dispatch } = this.props
     dispatch(resetAppState())
   }

  render() {


		const { app, setFilter, setActive } = this.props;

		return (
			<div className="grid-container main-content">
				<h1>Are you looking for a hub for your</h1>

        <div className="grid-block">
          <div className="grid-content small-6">
          <div className={setActive(FILTERIDX, TRUCK)}>
            <button className="yes-no-button" onClick={setFilter.bind(this, FILTERIDX, {tcomp: TRUCK, brkty: DRUM}, app)}>
              <strong>Truck with Drum Brakes</strong>
            </button>
          </div>

					<div className={setActive(FILTERIDX, TRUCK)}>
            <button className="yes-no-button" onClick={setFilter.bind(this, FILTERIDX, {tcomp: TRUCK, brkty: DISC}, app)}>
              <strong>Truck with Disc Brakes</strong>
            </button>
          </div>



          </div>
          <div className="grid-content small-6">
            <div className={setActive(FILTERIDX, TRAILER)}>
              <button className="yes-no-button" onClick={setFilter.bind(this, FILTERIDX, {tcomp: TRAILER, brkty: DRUM}, app)}>
                <strong>Trailer with Drum Brakes</strong>
              </button>
            </div>

						<div className={setActive(FILTERIDX, TRAILER)}>
              <button className="yes-no-button" onClick={setFilter.bind(this, FILTERIDX, {tcomp: TRAILER, brkty: DISC}, app)}>
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
