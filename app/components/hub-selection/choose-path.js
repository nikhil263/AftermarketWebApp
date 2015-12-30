import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection'
import {Link} from 'react-router';
import { updateFilters } from 'actions'

export default class extends Component {
	static contextTypes = {
		store: PropTypes.object,
  	history: PropTypes.object
  };

	updateState(obj) {
		const {store} = this.context;
		store.dispatch(updateFilters(obj))
	}

	render() {

		return (
			<div className="grid-container main-content">
				<h1>Do you know your hub's  assembly number?</h1>
				<div className="conmet-button" >
					<Link to="/hub-selection/search" className="yes-no-button" onClick={this.updateState.bind(this)}>
						<em>Yes</em>I know the hub assembly number.
					</Link>
				</div>
				<div className="conmet-button">
					<Link to="/hub-selection/find-assembly" className="yes-no-button">
						<em>No</em>Help me find the assembly number.
					</Link>
				</div>
				<div className="conmet-button">
					<Link to="/hub-selection/truck-type" className="yes-no-button">
						<em>No</em>Proceed without the number.
					</Link>
				</div>
			</div>
		)
	}
};
