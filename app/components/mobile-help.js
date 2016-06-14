import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection'
import { pushPath } from 'redux-simple-router'
import { connect } from 'react-redux'
import HelpDetail from './global/help-detail'

class MobileHelpDetail extends Component {

	handleClick(path) {
		const { dispatch } = this.props;
		dispatch(pushPath(path))
	}

	render() {
		return (
			<div className="grid-container main-content">
				<HelpDetail></HelpDetail>
		</div>
		)
	}
};

export default connect()(MobileHelpDetail);
