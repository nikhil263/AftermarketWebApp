import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection';
import { pushPath } from 'redux-simple-router'
import { connect } from 'react-redux'
import Spinner from 'components/global/spinner'
import { setActiveFilterValue, fetchFilters } from 'actions/filters'

const FILTERIDX=3
const NEXT_OTHER_NOT_LISTED_FILTER_PATH = '/hub-selection/abs-offset-inches'

class Result extends Component {



	render () {
	 var { result, active, onClick } = this.props
	 var className = 'general-button truck-make'
	 return (
		 <div className="grid-content small-6">
			 <a href="#" className={active()} onClick={onClick}>{result.Name}</a>
		 </div>
	 )
 	}
}

class TruckMakes extends Component {

	componentDidMount() {

		const { dispatch, app, checkForReload,  setFilter} = this.props
		dispatch(fetchFilters(FILTERIDX, app))

	}


	render() {
		const { app, setFilter, setActive } = this.props;
		if (app.isFetching || app.filterResults.length < 1) {
			return <Spinner isFetching={app.isFetching} />
		}
		return (
			<div className="grid-container main-content">
				<h2>Choose the Truck Make</h2>
				<div className="grid-block">
					{app.filterResults.map((result, index) => {
						var boundClick = setFilter.bind(this, FILTERIDX, {tmake: result.Id}, app);
						var boundActive = setActive.bind(this, FILTERIDX, result.Id, 'general-button truck-make');
						return <Result key={index} app={app} result={result} active={boundActive} onClick={boundClick}/>
					})}

{/* 					<div className="grid-content small-6">
							<button className='general-button truck-make' onClick={setFilter.bind(this, FILTERIDX, null, app.NEXT_FILTER_PATH = NEXT_OTHER_NOT_LISTED_FILTER_PATH)}>
								Other/Not Listed
							</button>
					</div> */}
				</div>
			</div>
		)
	}
}
export default connect()(TruckMakes)
