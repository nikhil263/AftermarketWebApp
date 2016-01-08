import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection'
import {connect} from 'react-redux'
import {fetchHubs} from 'actions'
import { pushPath } from 'redux-simple-router'

 class Results extends Component {

  doSearch() {
		const { dispatch } = this.props
    let part = document.getElementById('assemblyNumber').value;
    dispatch(pushPath('/hub-selection/results'));
		dispatch(fetchHubs(part))
	}

	render() {
		return (
			<div className="grid-container main-content">
				<h1>Enter your hub assembly number</h1>
				<div className="error">
				 <p>Please enter a valid 8-digit assembly number</p>
				</div>

					<input id="assemblyNumber" value="10031065" className="assembly-number" type="text" placeholder="8 digit assembly number (10031065)" />
					<button className="button general-button" onClick={this.doSearch.bind(this)}>Continue</button>

			</div>
		)
	}
};

export default connect()(Results)
