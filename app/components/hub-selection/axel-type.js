import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection'
import { pushPath } from 'redux-simple-router'
import { connect } from 'react-redux'

const FF_FRONT = 1
const FL_FRONT = 2
const R_DRIVE = 3
const TN_TRAILER = 4
const TP_TRAILER = 5
const DRIVE = 1
const FRONT = 2
const TRAILER = 3

class AxelType extends Component {



	setAxel(axelNameId, axelPositionId) {
		const key = 'axlePositionIds';
		const { hub, setHubState, dispatch, incrStep } = this.props;
		var newObj = {
			axlePositionIds: axelPositionId,
			axleNameIds: axelNameId,
		};
		setHubState(newObj);
		incrStep();
		switch (axelNameId) {
			case FF_FRONT:  // ff front
				dispatch(pushPath('/hub-selection/gawr'));
				break;
			case FL_FRONT, R_DRIVE:
				return dispatch(pushPath('/hub-selection/wheel-type'));
				break;
			default:
				dispatch(pushPath('/hub-selection/gawr'));
		}
	}

	setActive(selected) {
		const {hub} = this.props;
		let baseClass = 'conmet-button'

		if (hub.truckCompartmentIds === 2 &&
			(selected === FL_FRONT || selected === FF_FRONT || selected === R_DRIVE)) {
			return baseClass + ' hidden';
		}
		if (hub.truckCompartmentIds === 1 &&
			(selected === TN_TRAILER || selected === TP_TRAILER )) {
			return baseClass + ' hidden';
		}
		if (hub.axleNameIds === selected) {
			return baseClass + ' active';
		}
		return baseClass;
	}


	render() {
		return (
			<div className="grid-container main-content">
				<h1>Choose the Hub Type by Bearing Part or Set Number:</h1>

				<div className={this.setActive(FF_FRONT)}>
					<button className="yes-no-button" onClick={this.setAxel.bind(this, FF_FRONT, FRONT)}>
					<strong>FF FRONT AXLE</strong><br />
						INNER BEARING - HM212011PS / HM212049 PS<br/>
					(SET 427 OR SET 413)<br />
				<br />
				OUTER BEARING - 3720 PS / 3782 PS<br />
						(SET 428 OR SET 406)
					</button>
				</div>
				<div className={this.setActive(FL_FRONT)}>
					<button className="yes-no-button" onClick={this.setAxel.bind(this, FL_FRONT, FRONT)}>
						<strong>FL FRONT AXLE</strong><br />
							INNER BEARING - HM212011PS / HM212049 PS<br />
							(SET 427 OR SET 413)<br />
					<br />
						OUTER BEARING - 3720 PS / 3782 PS<br />
						(SET 428 OR SET 406)
					</button>
				</div>

				<div className={this.setActive(R_DRIVE)}>
					<button className="yes-no-button" onClick={this.setAxel.bind(this, R_DRIVE, DRIVE)}>
						<strong>R DRIVE AXLE</strong><br />
							INNER BEARING - HM212011PS / HM212049 PS<br />
							(SET 427 OR SET 413)<br />
					<br />
						OUTER BEARING - 3720 PS / 3782 PS<br />
						(SET 428 OR SET 406)
					</button>
				</div>

				<div className={this.setActive(TN_TRAILER)}>
					<button className="yes-no-button" onClick={this.setAxel.bind(this, TN_TRAILER, TRAILER)}>
						<strong>TN TRAILER AXLE</strong><br />

						INNER BEARING
						CUP HM218210 - CONE HM218248 SET 414<br />
					<br />
						OUTER BEARING
						CUP HM212011 - CONE HM212049 SET 413
					</button>
				</div>

				<div className={this.setActive(TP_TRAILER)}>
					<button className="yes-no-button" onClick={this.setAxel.bind(this, TP_TRAILER, TRAILER)}>
						<strong>TP TRAILER AXLE</strong><br />
						INNER & OUTER BEARINGS
						CUP HM518410 - CONE HM518445 SET 415
					</button>
				</div>

			</div>
		)
	}
}
export default connect()(AxelType)
