import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection';
import { pushPath } from 'redux-simple-router'
import { connect } from 'react-redux'
import Spinner from 'components/global/spinner'
import { setActiveFilterValue, fetchFilters } from 'actions/filters'

const FILTERIDX=9
const NEXT_FILTER_PATH = '/hub-selection/hub-type'

class Result extends Component {
	render () {
	 var { result, active, onClick } = this.props
	 var className = 'general-button'
	 return (
		 <div className="grid-content small-6">
		 <div className={active()}>
 			<button className="yes-no-button" onClick={onClick}>
 				<strong>{result.Name}</strong>
			</button>
 		</div>
		</div>

	 )
 	}
}

class Material extends Component {

	componentDidMount() {
		const { dispatch, app, checkForReload } = this.props
		dispatch(fetchFilters(FILTERIDX, app))
	}

	render() {
		const { app, setFilter, setActive } = this.props;
		if (app.isFetching || app.filterResults.length < 1) {
			return <Spinner isFetching={app.isFetching} />
		}
		return (
			<div className="grid-container main-content">
				<h1>Choose the Hub Material</h1>
				<div className="grid-block">
					{app.filterResults.map((result, index) => {
						var boundClick = setFilter.bind(this, FILTERIDX, {wmslc: result.Id}, app);
						var boundActive = setActive.bind(this, FILTERIDX, result.Id);
						return <Result key={result.Id} app={app} result={result} active={boundActive} onClick={boundClick}/>
					})}
				</div>
			</div>
		)
	}
}
export default connect()(Material)
