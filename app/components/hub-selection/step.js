import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection'
import { previousFilter } from 'actions/filters'
import { Link } from 'react-router';
export default class extends Component {
	showStepDisplay() {

		const { step, max } = this.props;

		if (step > 0) {
			return <div className="step-number">Step <strong>{step}</strong> of <strong>{max}</strong></div>
		}
	}



	render() {
		const { onClick, app, params, history } = this.props
		let link = <a href="javascript:void(0)" onClick={onClick} className="back-btn"> <i className="icon-angle-left"></i>Back</a>

		if (location.pathname === '/hub-selection') {
			link = null
		}
		else if (app.currentIndex === 0) {
			link = <Link to="/hub-selection" className="back-btn"><i className="icon-angle-left"></i>Back</Link>
		}
		if (window.location.pathname.indexOf('/search/') > -1) {
			link = <Link to="/hub-selection/search" className="back-btn"><i className="icon-angle-left"></i>Back</Link>
		}
		if (window.location.pathname.indexOf('/search/') > -1) {

			link = <Link to="/hub-selection/search" className="back-btn"><i className="icon-angle-left"></i>Back</Link>
		}
		if (window.location.pathname.indexOf('/details/') > -1) {
			link = <a href="javascript:void(0)" onClick={history.goBack.bind(this)} className="back-btn"><i className="icon-angle-left"></i>Back</a>
		}
		console.log(history);
		return (
				 <div className="step-bar grid-block small-12 large-12 wrap shrink ">
						<div className="grid-content no-scroll small-6">
							{link}
						</div>

						<div className="grid-content no-scroll right small-6">
							{/*this.showStepDisplay()*/}
						</div>
					</div>
				)
	}
}
