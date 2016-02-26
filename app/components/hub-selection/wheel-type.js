import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection'
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { pushPath } from 'redux-simple-router'
import {fetchAssembly} from 'actions'
import Spinner from 'components/global/spinner'
import { setActiveFilterValue, fetchFilters } from 'actions/filters'

const FILTERIDX=6

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

	setFilter(id) {
		const { dispatch } = this.props;
		if (id) {
			dispatch(setActiveFilterValue(FILTERIDX, id))
		}
		dispatch(pushPath('/hub-selection/results'));
	}

	render() {
		const {app} = this.props
		return (
			<div className="grid-container main-content">
				<h1>Choose the Wheel Type<br />(Determine Wheel Stud Length):</h1>
				<Spinner isFetching={app.isFetching} />

					{app.filterResults.map((result, index) => {
						var boundClick = this.setFilter.bind(this, result.Id);
						var boundActive = this.setActive.bind(this, result.Id);
						return <Result key={index} result={result} onClick={boundClick} active={boundActive} />

					})}


			</div>
		)
	}
};

export default connect()(WheelType)
