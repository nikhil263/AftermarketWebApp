import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection'
import  { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import Spinner from 'components/global/spinner'
import { setActiveFilterValue, fetchFilters } from 'actions/filters'

const FILTERIDX=4

class GAWRDisplay extends Component {
	convertToKg() {
		const { result } = this.props
		var maxKg, minKg
		maxKg = Math.round(result.MaxGawrPound * 0.453592).toLocaleString();
		minKg = Math.round(result.MinGawrPound * 0.453592).toLocaleString();
		return(
			<span>({minKg}-{maxKg} kg)</span>
		)
	}
	render() {
		const {active, onClick, result} = this.props
		var min, max
		if (result.MinGawrPound && result.MaxGawrPound) {
			min = result.MinGawrPound.toLocaleString()
			max = result.MaxGawrPound.toLocaleString()
		}

		return (
			<div className={active()}>
				<button className="yes-no-button" onClick={onClick}><strong>{min} - {max} lbs.</strong><br />
					{this.convertToKg()}
				</button>
			</div>
		)
	}
}

class GAWR extends Component {

	componentDidMount() {
		const { dispatch, app } = this.props
		console.log('HERE');
		dispatch(fetchFilters(FILTERIDX, app))
	}

	setActive(selected) {
		const { app } = this.props;
 		const baseClass = 'conmet-button'
 		if (app.filterState[FILTERIDX] === selected) {
 		    return baseClass + ' active';
 		}
 		return baseClass;
	}

	setGAWR(id) {
		const { dispatch } = this.props;
		if (id) {
			dispatch(setActiveFilterValue(FILTERIDX, id))
		}
		dispatch(pushPath('/hub-selection/wheel-type'));
	}


	render() {
		const {app} = this.props
		return (
			<div className="grid-container main-content">
				<h1>Choose the GAWR <br />(Gross Axle Weight Rating):</h1>
				<Spinner isFetching={app.isFetching} />

					{app.filterResults.map((result, index) => {
						var boundClick = this.setGAWR.bind(this, result.Id);
						var boundActive = this.setActive.bind(this, result.Id);
						return <GAWRDisplay key={index} result={result} onClick={boundClick} active={boundActive} />

					})}

				{/*
				<div className="conmet-button">
					<button className="yes-no-button" onClick={this.setGAWR.bind(this, 2)}><strong>I Don’t Know</strong></button>
				</div>
				*/}
			</div>
		)
	}
};

export default connect()(GAWR)
