import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection'
import  { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'

class GAWR extends Component {
	setGAWR(gawrId) {
		const { hub, setHubState, dispatch } = this.props;
			var newObj = {
				grossAxleWeightRatingRangeIds: gawrId
			};
			setHubState(newObj);
			dispatch(pushPath('/hub-selection/wheel-type'));
	}
	render() {
		return (
			<div className="grid-container main-content">
				<h1>Choose the GAWR <br />(Gross Axle Weight Rating):</h1>

				<div className="conmet-button">
					<a href="#" className="yes-no-button" onClick={this.setGAWR.bind(this, 1)}><strong>12,000 - 13,200 lbs.</strong><br />
						(540 - 600 kg)
					</a>
				</div>

				<div className="conmet-button">
					<a href="#" className="yes-no-button" onClick={this.setGAWR.bind(this, 2)}><strong>More than 13,200 lbs.</strong><br />
						(More than 600 kg)
					</a>
				</div>

				<div className="conmet-button">
					<a href="#" className="yes-no-button" onClick={this.setGAWR.bind(this, 2)}><strong>I Don’t Know</strong></a>
				</div>
			</div>
		)
	}
};

export default connect()(GAWR)
