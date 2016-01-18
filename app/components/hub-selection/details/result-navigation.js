import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection';
import { pushPath } from 'redux-simple-router'
import { connect } from 'react-redux'
import { showNextResult, showPreviousResult, showResultAtIndex } from 'actions'
import _ from 'lodash'

class ResultButton extends Component {
	render() {
		let {idx, currentIdx, handleClick } = this.props
		return (
			<button className={(idx === currentIdx) ? 'active' : ''} onClick={handleClick}>{idx+1}</button>
		)
	}
}

class ResultNavigation extends Component {

	handleClick(idx) {
		const {dispatch} = this.props;
		dispatch(showResultAtIndex(idx));
	}

	render() {
		const { idx, currentIdx, total } = this.props
		if (total < 2) {
			return (<div></div>);
		}
		var buttons = [];
		// if currentIdx <
		for (var i=0; i < total; i++) {
			buttons.push(<ResultButton key={i} idx={i} currentIdx={currentIdx} handleClick={this.handleClick.bind(this, i )}/>);
		}
		return (
			<div className="result-navigation">
				{buttons}
			</div>
		)
	}

}

export default connect()(ResultNavigation)
