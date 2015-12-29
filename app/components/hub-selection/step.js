import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection'
import { Link } from 'react-router';

export default class extends Component {
	render() {
		const { history } = this.props;
		return (
				 <div className="step-bar grid-block small-12 large-12 wrap shrink ">
						<div className="grid-content noscroll">
							<a href="javascript:void(0)" onClick={history.goBack.bind(this)}> <i className="icon-angle-left"></i>Back</a>
						</div>
					</div>
				)
	}
}
