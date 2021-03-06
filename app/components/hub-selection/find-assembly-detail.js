import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection'
import { pushPath } from 'redux-simple-router'
import { connect } from 'react-redux'
import HelpDetail from '../global/help-detail'

class FindAssemblyDetail extends Component {

	handleClick(path) {
		const { dispatch } = this.props;
		dispatch(pushPath(path))
	}

	render() {
		return (
			<div className="grid-container main-content">
				<HelpDetail></HelpDetail>
				
		<div className="conmet-button">
			<button onClick={this.handleClick.bind(this,'/hub-selection/search')} className="yes-no-button"><em>Yes</em>I know my number now.</button>
		</div>
		<div className="conmet-button">
			<button onClick={this.handleClick.bind(this, '/hub-selection/truck-type')} className="yes-no-button">
				<em>No</em>I still don't know, proceed without it.</button>
		</div>


		</div>
		)
	}
};

export default connect()(FindAssemblyDetail);
