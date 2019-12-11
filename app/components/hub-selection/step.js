import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection'
import { previousFilter, resetAppState } from 'actions/filters'
import { Link, browserHistory } from 'react-router';
import { pushPath } from 'redux-simple-router'
export default class extends Component {
	showStepDisplay() {

		const { step, max } = this.props;

		if (step > 0) {
			return <div className="step-number">Step <strong>{step}</strong> of <strong>{max}</strong></div>
		}
	}

	goHome() {
		const {dispatch} = this.props
		dispatch(resetAppState())
		dispatch(pushPath('/hub-selection'))
	}


	render() {
		const { onClick, app, params, history } = this.props
		let link = <a href="javascript:void(0)" onClick={onClick} className="back-btn"> <i className="icon-angle-left"></i>Back</a>
		const pathName = window.location.pathname;

		if (location.pathname === '/hub-selection') {
			link = null
		}

		if (pathName.indexOf('/replacement-drum/filter/axpos') > -1 || pathName.indexOf('/replacement-rotor/filter/axpos') > -1 || pathName.indexOf('/stud/filter/stldp') > -1) {
            link = <a href="javascript:void(0)" onClick={() => window.history.go(-2)} className="back-btn"><i className="icon-angle-left"></i>Back</a>
		} else if (pathName.indexOf('/replacement-drum') > -1 || pathName.indexOf('/replacement-rotor') > -1 || (pathName.indexOf('/stud') > -1 && pathName.indexOf('hub-selection/stud-pilot-type') < 1) || pathName.indexOf('/hub-selection/compare') > -1) {
            link = <a href="javascript:void(0)" onClick={history.goBack.bind(this)} className="back-btn"><i className="icon-angle-left"></i>Back</a>
        } else if (!app || app.currentIndex === 0) {
			link = <Link to="/hub-selection" className="back-btn"><i className="icon-angle-left"></i>Back</Link>
		}
		if (pathName.indexOf('/search/') > -1) {
			link = <Link to="/hub-selection/search" className="back-btn"><i className="icon-angle-left"></i>Back</Link>
		}
		if (pathName.indexOf('/hub-selection/search/') > -1) {
			link = <Link to="/hub-selection/search" className="back-btn"><i className="icon-angle-left"></i>Back</Link>
		}
		if (pathName.indexOf('/parts/search/') > -1) {
			link = <a href="javascript:void(0)" onClick={history.goBack.bind(this)} className="back-btn"><i className="icon-angle-left"></i>Back</a>
		}
		if (pathName.indexOf('/details/') > -1) {
			link = <a href="javascript:void(0)" onClick={history.goBack.bind(this)} className="back-btn"><i className="icon-angle-left"></i>Back</a>
		}
		if ((pathName.indexOf('/help') > -1) || (pathName.indexOf('/disclaimer') > -1) || (pathName.indexOf('/filters') > -1)) {
			link = <a href="javascript:void(0)" onClick={history.goBack.bind(this)} className="back-btn"><i className="icon-angle-left"></i>Back</a>
		}
        if (pathName.indexOf('/hub-selection/notification-detail/') > -1){
            link = <Link to="/notification" className="back-btn"><i className="icon-angle-left"></i>Back</Link>
        }



		return (
				 <div className="step-bar grid-block small-12 wrap shrink ">
						<div className="grid-content no-scroll small-6">
							{link}
						</div>

						<div className="grid-content no-scroll right small-6">
							<a href="#" className="home-btn right" onClick={this.goHome.bind(this)}>Home</a>
						</div>
					</div>
				)
	}
}
