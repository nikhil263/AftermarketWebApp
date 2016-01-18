import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection'
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { pushPath } from 'redux-simple-router'
import {fetchAssembly} from 'actions'

const STEEL = 1
const ALUMINUM = 2


class WheelType extends Component {

	setActive(selected) {
		const {hub} = this.props;
		const baseClass = 'conmet-button'
		if (hub.wheelTypeStudLengthIds === selected) {
			return baseClass + ' active';
		}
		return baseClass;
	}

	setWheelType(wheelTypeId) {
		const { hub, setHubState, dispatch, searchForAssembly, incrStep } = this.props;
		let newObj = {
			wheelTypeStudLengthIds: wheelTypeId
		};
		let searchHub = Object.assign(hub, newObj)
		setHubState(newObj);
		dispatch(fetchAssembly(searchHub))
		dispatch(pushPath('/hub-selection/results'));
	}

	render() {

		return (
			<div className="grid-container main-content">
				<h1>Choose the Wheel Type<br />(Determine Wheel Stud Length):</h1>

				<div className={this.setActive(STEEL)}>
					<button className="yes-no-button" onClick={this.setWheelType.bind(this, STEEL)}><strong>Steel Wheels</strong><br />
						(Short Studs)
					</button>
				</div>

				<div className={this.setActive(ALUMINUM)}>
				<button className="yes-no-button" onClick={this.setWheelType.bind(this, ALUMINUM)}><strong>Aluminum Wheels</strong><br />
					(Long Studs)
				</button>
				</div>
			</div>
		)
	}
};

export default connect()(WheelType)
