import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection'
import  { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'

class GAWR extends Component {

	setActive(selected) {
		const {hub} = this.props;
		const baseClass = 'conmet-button'
		if (hub.grossAxleWeightRatingRangeIds === selected) {
			return baseClass + ' active';
		}
		return baseClass;
	}

	setGAWR(gawrId) {
		const { hub, setHubState, dispatch, incrStep } = this.props;
			var newObj = {
				grossAxleWeightRatingRangeIds: gawrId
			};
			setHubState(newObj);
			incrStep();
			dispatch(pushPath('/hub-selection/wheel-type'));
	}
	render() {
		return (
			<div className="grid-container main-content">
				<h1>Choose the GAWR <br />(Gross Axle Weight Rating):</h1>

				<div className={this.setActive(1)}>
					<button className="yes-no-button" onClick={this.setGAWR.bind(this, 1)}><strong>12,000 - 13,200 lbs.</strong><br />
						(540 - 600 kg)
					</button>
				</div>

				<div className={this.setActive(2)}>
					<button className="yes-no-button" onClick={this.setGAWR.bind(this, 2)}><strong>More than 13,200 lbs.</strong><br />
						(More than 600 kg)
					</button>
				</div>

				<div className="conmet-button">
					<button className="yes-no-button" onClick={this.setGAWR.bind(this, 2)}><strong>I Don’t Know</strong></button>
				</div>
			</div>
		)
	}
};

export default connect()(GAWR)
