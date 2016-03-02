import React, { PropTypes, Component } from 'react'
import HubSelection from 'components/hub-selection'
import Spinner from 'components/global/spinner'
import * as constants from '../../config/constants'
import { updateFilters } from 'actions'
import {fetchCategories} from 'actions/categories'
import { setActiveFilterValue, fetchFilters } from 'actions/filters'
import { pushPath } from 'redux-simple-router'
import { connect } from 'react-redux'
import _ from 'lodash'

class Result extends Component {

	render() {
		var { result } = this.props
		return (
			//onClick={this.setHub.bind(this, 'truckCompartmentIds', HEAVY_DUTY_TRUCK)}
			<div className="grid-content small-6">
			<div className="conmet-button">
				<button className="yes-no-button" onClick={this.props.onClick}>
					<strong>{result.Name}</strong>
				</button>
			</div>
		</div>
		)
	}
}

class Finder extends Component {

	componentDidMount() {
		const { app, dispatch } = this.props;
		dispatch(fetchFilters(app.currentIndex, app))
	}


	setFilterValue(value) {
		const {app, dispatch} = this.props;
		const lastId = _.clone(app.filterId);
		dispatch(setActiveFilterValue(app.filterId, value))
	}

	render() {
		const { app } = this.props;

		return (
			<div className="grid-container main-content">
				<h1>Are you looking for a hub for your</h1>
				<Spinner isFetching={app.isFetching} />
        <div className="grid-block">

					{app.filterResults.map((result, index) => {
						var boundClick = this.setFilterValue.bind(this, result.Id);
						return <Result key={index} result={result} onClick={boundClick}/>
					})}


        </div>


		</div>


		)
	}
};
export default connect()(Finder);
