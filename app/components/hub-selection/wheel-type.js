import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection'
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { pushPath } from 'redux-simple-router'
import {fetchAssembly} from 'actions/assembly'
import Spinner from 'components/global/spinner'
import { setActiveFilterValue, fetchFilters } from 'actions/filters'

const FILTERIDX=13
const NEXT_FILTER_PATH='/hub-selection/material'
const STEEL = 1
const ALUMINUM = 2

class Result extends Component {
	render() {
		const {active, onClick, result} = this.props
		return (
            <div className={active()}>
                <button className="yes-no-button" onClick={onClick}><strong>{result.WheelMaterial}</strong><br />
                    ({result.StudLengthClass})
                </button>
            </div>

		)
	}
}

class WheelType extends Component {

	componentDidMount() {
		const { dispatch, app, checkForReload } = this.props
		dispatch(fetchFilters(FILTERIDX, app))
	}

	render() {
		const {app, setFilter, setActive } = this.props
		if (app.isFetching || app.filterResults.length < 1) {
			return <Spinner isFetching={app.isFetching} />
		}
		return (
			<div className="grid-container main-content">
				<h2>Choose the Wheel Type<br />(Determine Wheel Stud Length):</h2>
                {app.filterResults.map((result, index) => {
                    var boundClick = setFilter.bind(this, FILTERIDX, {wmslc: result.Id}, app);
                    var boundActive = setActive.bind(this, FILTERIDX, result.Id);
                    return <Result key={index} result={result} onClick={boundClick} active={boundActive} />

                })}
			</div>
		)
	}
};

export default connect()(WheelType)
