import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection'
import { pushPath } from 'redux-simple-router'
import { connect } from 'react-redux'
import HelpDetail from '../global/help-detail'

class SearchHelpDetail extends Component {

	handleClick(path) {
		const { dispatch } = this.props;
		dispatch(pushPath(path))
	}

	render() {
		return (
			<div className="grid-container main-content">
				<HelpDetail></HelpDetail>

		<div className="conmet-button">
			<button onClick={this.handleClick.bind(this,'/parts/search')} className="yes-no-button"><em>Yes</em>I know my number now.</button>
		</div>


		</div>
		)
	}
};

export default connect()(SearchHelpDetail);
