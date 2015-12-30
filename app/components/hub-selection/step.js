import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection'
import { Link } from 'react-router';

export default class extends Component {
	render() {
		const { history } = this.props;
		return (
				 <div className="step-bar grid-block small-12 large-12 wrap shrink ">
						<div className="grid-content no-scroll small-6">
							<a href="javascript:void(0)" onClick={history.goBack.bind(this)} className="back-btn"> <i className="icon-angle-left"></i>Back</a>
						</div>

						<div className="grid-content no-scroll right small-6">
							<div className="step-number">Step <strong>1</strong> of <strong>10</strong></div>
						</div>
					</div>
				)
	}
}
