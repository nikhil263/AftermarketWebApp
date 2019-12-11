import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection';
import { pushPath } from 'redux-simple-router'
import { connect } from 'react-redux'
import Spinner from 'components/global/spinner'
import { setActiveFilterValue, fetchFilters } from 'actions/filters'

const FILTERIDX=15
const NEXT_FILTER_PATH = '/hub-selection/brake-rotor-type'

class Result extends Component {
	render () {
	 var { result, active, onClick } = this.props
	 var className = 'conmet-button'
	 return (
		 <div className="grid-content small-6">
		 <div className="conmet-button">
 			<button className="yes-no-button" onClick={onClick}>
 				<strong>{result.Inch}" / {result.Millimeter}mm</strong>
			</button>
 		</div>
		</div>

	 )
 	}
}

class BrakeRotorFlange extends Component {

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
				<h2>Choose the Brake Rotor Outside Diameter</h2>

				<div className="grid-block">
					<div className="grid-content small-12">
							<img className="brake-rotor-flange" src={require('../../images/brake_rotor_lange.png')} alt="ConMet" width="300" height="300 "/>
					</div>

					{app.filterResults.map((result, index) => {
						var boundClick = setFilter.bind(this, FILTERIDX, {brdia: result.Inch}, app);
						var boundActive = setActive.bind(this, FILTERIDX, result.Inches);
						return <Result key={index} app={app} result={result} active={boundActive} onClick={boundClick}/>
					})}
				</div>
			</div>
		)
	}
}
export default connect()(BrakeRotorFlange)
