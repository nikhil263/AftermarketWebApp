import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection'
import { pushPath } from 'redux-simple-router'
import { connect } from 'react-redux'
import Spinner from 'components/global/spinner'
import { setActiveFilterValue, fetchFilters } from 'actions/filters'

const FF_FRONT = 1
const FL_FRONT = 2
const R_DRIVE = 3
const TN_TRAILER = 4
const TP_TRAILER = 5
const DRIVE = 1
const FRONT = 2
const TRAILER = 3
const FILTERIDX=3

const META = [
	{
		text: <span>Inner Bearing - HM212011PS / HM212049 PS (Set 427 or 413)<br />
					Outer Bearing - 3720 PS / 3782 PS (Set 428 or 406)</span>
	},
	{
		text: <span>Inner Bearing - 6420 PS / 6461A PS (set 423)<br />
					Outer Bearing - 552A PS / 555S PS (set 424)</span>

	},
	{
		text: <span>Inner Bearing - 592A PS / 594A PS (set 403)<br />
					Outer Bearing - 572 PS / 580 PS (set 401)</span>
	},
	{
		text: <span>Inner Bearing Cup HM218210 - Cone HM218248 (set 414)<br />
					Outer Bearing Cup HM212011 - Cone HM212049 (set 413)</span>
	},
	{
		text: <span>Inner & Outer Bearings Cup HM518410 - Cone HM518445 (set 415)</span>
	}


]

class AxelDisplay extends Component {

	render() {
		const {result, active, onClick, meta } = this.props
		return(
		<div className={active()}>
			<button className="yes-no-button" onClick={onClick}>
			<strong>{result.Name}</strong><br />
				{meta.text}
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

	setAxel(id) {
		const { dispatch } = this.props;
 		if (id) {
 			dispatch(setActiveFilterValue(FILTERIDX, id))
 		}
		dispatch(pushPath('/hub-selection/gawr'));
	}

	setActive(selected) {
		const {app} = this.props
		let baseClass = 'conmet-button'
		if (app.filterState[FILTERIDX] === selected) {
 		    return baseClass + ' active';
 		}
 		return baseClass;
	}


	render() {
		const {app} = this.props
		return (
			<div className="grid-container main-content">
				<h1>Choose the Hub Type by Bearing Part or Set Number:</h1>
				<Spinner isFetching={app.isFetching} />
				{app.filterResults.map((result, index) => {
					var boundClick = this.setAxel.bind(this, result.Id);
					var boundActive = this.setActive.bind(this, result.Id);
					var meta = META[index]
					return <AxelDisplay key={index} result={result} onClick={boundClick} active={boundActive} meta={meta}/>

				})}


			</div>
		)
	}
}
export default connect()(AxelType)
