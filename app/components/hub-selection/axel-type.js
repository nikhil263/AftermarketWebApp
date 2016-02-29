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
const NEXT_FILTER_PATH = '/hub-selection/gawr'



class Result extends Component {

	render() {
		const META = [
			{
				id: 1,
				text: <span>Inner Bearing - HM212011PS / HM212049 PS (Set 427 or 413)<br />
							Outer Bearing - 3720 PS / 3782 PS (Set 428 or 406)</span>
			},
			{
				id: 2,
				text: <span>Inner Bearing - 6420 PS / 6461A PS (set 423)<br />
							Outer Bearing - 552A PS / 555S PS (set 424)</span>

			},
			{
				id: 4,
				text: <span>Inner Bearing - 592A PS / 594A PS (set 403)<br />
							Outer Bearing - 572 PS / 580 PS (set 401)</span>
			},
			{
				id: 10,
				text: <span>Inner Bearing Cup HM218210 - Cone HM218248 (set 414)<br />
							Outer Bearing Cup HM212011 - Cone HM212049 (set 413)</span>
			},
			{
				id: 11,
				text: <span>Inner & Outer Bearings Cup HM518410 - Cone HM518445 (set 415)</span>
			}


		]

		const {result, active, onClick } = this.props
		const details = META.filter(item => item.id === result.Id)

		return(
		<div className={active()}>
			<button className="yes-no-button" onClick={onClick}>
			<strong>{result.Name}</strong><br />
				{details.map((item, index) => {
					return <span key={index}>{item.text}</span>
				})
				}
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
				<h1>Choose the Hub Type by Bearing Part or Set Number:</h1>
				{app.filterResults.map((result, index) => {
					var boundClick = setFilter.bind(this, FILTERIDX, result.Id, app);
					var boundActive = setActive.bind(this, FILTERIDX, result.Id);
					return <Result key={index} result={result} onClick={boundClick} active={boundActive} />

				})}


			</div>
		)
	}
}
export default connect()(AxelType)
