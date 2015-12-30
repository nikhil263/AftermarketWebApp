import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection'
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { pushPath } from 'redux-simple-router'

const STEEL = 2
const ALUMINUM = 2


class WheelType extends Component {

	setWheelType(wheelTypeId) {
		const { hub, setHubState, dispatch, searchForAssembly } = this.props;
		var newObj = {
			wheelTypeStudLengthIds: wheelTypeId
		};
		setHubState(newObj);
		dispatch(pushPath('/hub-selection/results'));
		searchForAssembly();
	}

	render() {

		return (
			<div className="grid-container main-content">
				<h1>Choose the Wheel Type<br />(Determine Wheel Stud Length):</h1>

				<div className="conmet-button">
					<a href="#" className="yes-no-button" onClick={this.setWheelType.bind(this, STEEL)}><strong>Steel Wheels</strong><br />
						(Short Studs)
					</a>
				</div>

				<div className="conmet-button">
				<a href="#" className="yes-no-button" onClick={this.setWheelType.bind(this, ALUMINUM)}><strong>Aluminum Wheels</strong><br />
					(Long Studs)
				</a>
				</div>
			</div>
		)
	}
};

export default connect()(WheelType)
