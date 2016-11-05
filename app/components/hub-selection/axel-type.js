import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection'
import { pushPath } from 'redux-simple-router'
import { connect } from 'react-redux'
import Spinner from 'components/global/spinner'
import { setActiveFilterValue, fetchFilters } from 'actions/filters'

const FILTERIDX=4
const NEXT_FILTER_PATH = '/hub-selection/hub-mounting-system'



class Result extends Component {

	render() {

		const {result, active, onClick } = this.props

		console.log(result);
		return(
		<div className={active()}>
				<button className="yes-no-button" onClick={onClick}>
				<strong>{result.AftermarketAxle}</strong><br />
				<span>Inner Bearing - {result.BearingDescriptionInboard}<br/>
				Outer Bearing - {result.BearingDescriptionOutboard}</span>
			</button>
		</div>
	)
	}
}

class AxelType extends Component {

	componentDidMount() {
		const { dispatch, app } = this.props
		dispatch(fetchFilters(FILTERIDX, app))
	}

	render() {
		const {app, setFilter, setActive } = this.props
		if (app.isFetching || app.filterResults.length < 1) {
			return <Spinner isFetching={app.isFetching} />
		}
		return (
			<div className="grid-container main-content">
				<h1>Choose the Hub by Axle Type or Bearing Number:</h1>
				{app.filterResults.map((result, index) => {
					var boundClick = setFilter.bind(this, FILTERIDX, {aaxna: result.Id || result.AftermarketAxleId}, app);
					var boundActive = setActive.bind(this, FILTERIDX, result.Id || result.AftermarketAxleId);
					return <Result key={index} result={result} onClick={boundClick} active={boundActive} />

				})}


			</div>
		)
	}
}
export default connect()(AxelType)
