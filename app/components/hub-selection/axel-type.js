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
			grossAxleWeightRatingRangeIds: '~'
		};
		setHubState(newObj);
		incrStep();
		switch (axelNameId) {
			case FF_FRONT:  // ff front
				dispatch(pushPath('/hub-selection/gawr'));
				break;
			case FL_FRONT:
			case R_DRIVE:
			case TN_TRAILER:
			case TP_TRAILER:
				dispatch(pushPath('/hub-selection/wheel-type'));
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
						Inner Bearing - HM212011PS / HM212049 PS (Set 427 or 413)<br />
						Outer Bearing - 3720 PS / 3782 PS (Set 428 or 406)
					</button>
				</div>
				<div className={this.setActive(FL_FRONT)}>
					<button className="yes-no-button" onClick={this.setAxel.bind(this, FL_FRONT, FRONT)}>
						<strong>FL FRONT AXLE</strong><br />
							Inner Bearing - 6420 PS / 6461A PS (set 423)<br />
							Outer Bearing - 552A PS / 555S PS (set 424)
					</button>
				</div>

				<div className={this.setActive(R_DRIVE)}>
					<button className="yes-no-button" onClick={this.setAxel.bind(this, R_DRIVE, DRIVE)}>
						<strong>R DRIVE AXLE</strong><br />
							Inner Bearing - 592A PS / 594A PS (set 403)<br />
							Outer Bearing - 572 PS / 580 PS (set 401)
					</button>
				</div>

				<div className={this.setActive(TN_TRAILER)}>
					<button className="yes-no-button" onClick={this.setAxel.bind(this, TN_TRAILER, TRAILER)}>
						<strong>TN TRAILER AXLE</strong><br />
						Inner Bearing Cup HM218210 - Cone HM218248 (set 414)<br />
						Outer Bearing Cup HM212011 - Cone HM212049 (set 413)
					</button>
				</div>

				<div className={this.setActive(TP_TRAILER)}>
					<button className="yes-no-button" onClick={this.setAxel.bind(this, TP_TRAILER, TRAILER)}>
						<strong>TP TRAILER AXLE</strong><br />
						Inner & Outer Bearings Cup HM518410 - Cone HM518445 (set 415)
					</button>
				</div>

			</div>
		)
	}
}
export default connect()(AxelType)
