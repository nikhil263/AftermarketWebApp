import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection'
import {connect} from 'react-redux'
import {fetchHubs} from 'actions'

 class Results extends Component {

	doSearch() {
		const { dispatch } = this.props
		dispatch(fetchHubs(11111))
	}

	componentDidMount() {
		const { dispatch } = this.props
		dispatch(fetchHubs(11111))
	}

	render() {
		return (
			<div className="grid-container main-content">
				<h1>Enter your hub assembly number</h1>
				<div className="error">
				 <p>Please enter a valid 8-digit assembly number</p>
				</div>
				<form>
					<input className="assembly-number" type="text" placeholder="8 digit assembly number" />
					<button className="button general-button">Continue</button>
				</form>
			</div>
		)
	}
};

export default connect()(Results)
