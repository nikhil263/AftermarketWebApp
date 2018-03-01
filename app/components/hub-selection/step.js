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
        if (window.location.pathname.indexOf('/replacement-drum') > -1 || window.location.pathname.indexOf('/replacement-rotor') > -1) {
            link = <a href="javascript:void(0)" onClick={history.goBack.bind(this)} className="back-btn"><i className="icon-angle-left"></i>Back</a>
        }
		else if (!app || app.currentIndex === 0) {
			link = <Link to="/hub-selection" className="back-btn"><i className="icon-angle-left"></i>Back</Link>
		}
		if (window.location.pathname.indexOf('/search/') > -1) {
			link = <Link to="/hub-selection/search" className="back-btn"><i className="icon-angle-left"></i>Back</Link>
		}
		if (window.location.pathname.indexOf('/hub-selection/search/') > -1) {
			link = <Link to="/hub-selection/search" className="back-btn"><i className="icon-angle-left"></i>Back</Link>
		}
		if (window.location.pathname.indexOf('/parts/search/') > -1) {
			link = <a href="javascript:void(0)" onClick={history.goBack.bind(this)} className="back-btn"><i className="icon-angle-left"></i>Back</a>
		}
		if (window.location.pathname.indexOf('/details/') > -1) {
			link = <a href="javascript:void(0)" onClick={history.goBack.bind(this)} className="back-btn"><i className="icon-angle-left"></i>Back</a>
		}
		if ((window.location.pathname.indexOf('/help') > -1) || (window.location.pathname.indexOf('/disclaimer') > -1) || (window.location.pathname.indexOf('/filters') > -1)) {
			link = <a href="javascript:void(0)" onClick={history.goBack.bind(this)} className="back-btn"><i className="icon-angle-left"></i>Back</a>
		}



		return (
				 <div className="step-bar grid-block small-12 wrap shrink ">
						<div className="grid-content no-scroll small-6">
							{link}
						</div>

						<div className="grid-content no-scroll right small-6">
							<Link to="/hub-selection" className="home-btn right">Home</Link>
						</div>
					</div>
				)
	}
}
