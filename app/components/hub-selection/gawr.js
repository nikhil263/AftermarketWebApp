import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection'
import  { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import Spinner from 'components/global/spinner'
import { setActiveFilterValue, fetchFilters } from 'actions/filters'

const FILTERIDX=6
const NEXT_FILTER_PATH = '/hub-selection/axle-stud'

class Result extends Component {
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
		var min, max, display


			min = result.MinGawrPound.toLocaleString()
			max = result.MaxGawrPound.toLocaleString()
			if (min === '0') {
				display = 'Up to '+max+' lbs.'
			} else {
				display = min +' - ' + max+' lbs.'
			}




		return (
			<div className={active()}>
				<button className="yes-no-button" onClick={onClick}><strong>{display}</strong><br />
					{this.convertToKg()}
				</button>
			</div>
		)
	}
}

class GAWR extends Component {

	componentDidMount() {
		const { dispatch, app } = this.props
		dispatch(fetchFilters(FILTERIDX, app))
	}


	render() {
		const {app,setFilter, setActive} = this.props

		if (app.isFetching || app.filterResults.length < 1) {
			return <Spinner isFetching={app.isFetching} />
		}
		return (
			<div className="grid-container main-content">
				<h1>Choose the GAWR <br />(Gross Axle Weight Rating):</h1>

					{app.filterResults.map((result, index) => {
						var boundClick = setFilter.bind(this, FILTERIDX, {gawr: result.Id}, app);
						var boundActive = setActive.bind(this, FILTERIDX, result.Id);
						return <Result key={index} result={result} onClick={boundClick} active={boundActive} />

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
