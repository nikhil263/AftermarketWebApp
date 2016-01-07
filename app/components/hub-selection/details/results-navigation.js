import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection';
import { pushPath } from 'redux-simple-router'
import { connect } from 'react-redux'
import { showNextResult, showPreviousResult, showResultAtIndex } from 'actions'
import _ from 'lodash'

class ResultButton extends Component {

}

class ResultNavigation extends Component {

	render() {
		return (
			<div className="">

			</div>
		)
	}

}

export default connect()(ResultNavigation)
