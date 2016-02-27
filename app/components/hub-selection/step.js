import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection'
import { previousFilter } from 'actions/filters'

export default class extends Component {
	showStepDisplay() {

		const { step, max } = this.props;

		if (step > 0) {
			return <div className="step-number">Step <strong>{step}</strong> of <strong>{max}</strong></div>
		}
	}

	handleBackClick() {
		const { dispatch, app } = this.props
		dispatch(previousFilter(app))
	}

	render() {
		const { onClick } = this.props
		return (
				 <div className="step-bar grid-block small-12 large-12 wrap shrink ">
						<div className="grid-content no-scroll small-6">
							<a href="javascript:void(0)" onClick={onClick} className="back-btn"> <i className="icon-angle-left"></i>Back</a>
						</div>

						<div className="grid-content no-scroll right small-6">
							{/*this.showStepDisplay()*/}
						</div>
					</div>
				)
	}
}
