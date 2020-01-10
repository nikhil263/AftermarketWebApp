import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection';
import { pushPath } from 'redux-simple-router'
import { connect } from 'react-redux'
import Spinner from 'components/global/spinner'
import { setActiveFilterValue, fetchFilters } from 'actions/filters'

let FILTERIDX

class Result extends Component {



	render () {
	 var { result, active, onClick } = this.props
	 var className = 'general-button truck-make'
	 var roundedMMResult = Math.round(result.Millimeter).toLocaleString();

	 return (
		 <div className="grid-content small-6">
			 <a href="#" className={active()} onClick={onClick}>{result.Inch} Inches / {roundedMMResult} Millimeters </a>
		 </div>
	 )
 	}
}

class OverallRotorLength extends Component {

	componentDidMount() {

		const { dispatch, app, checkForReload,  setFilter} = this.props
		FILTERIDX = app.categories.findIndex(a => a.QueryParameterName == 'ovlgt') != undefined ? app.categories.findIndex(a => a.QueryParameterName == 'ovlgt') : 17 ;

		dispatch(fetchFilters(FILTERIDX, app))

	}


	render() {
		const { app, setFilter, setActive } = this.props;
		if (app.isFetching || app.filterResults.length < 1) {
			return <Spinner isFetching={app.isFetching} />
		}
		return (
			<div className="grid-container main-content">
				<h2>Choose the Overall Rotor Length</h2>
				<div className="grid-block">
					<div className="grid-content small-12">
							<img className="brake-rotor-flange" src={require('../../images/U-Rotorapp.png')} alt="ConMet" width="300" height="300 "/>
					</div>
					{app.filterResults.map((result, index) => {
						var boundClick = setFilter.bind(this, FILTERIDX, {ovlgt: result.Inch}, app);
						var boundActive = setActive.bind(this, FILTERIDX, result, 'general-button truck-make');
						return <Result key={index} app={app} result={result} active={boundActive} onClick={boundClick}/>
					})}
				</div>
			</div>
		)
	}
}
export default connect()(OverallRotorLength)

