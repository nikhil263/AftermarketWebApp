import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection';
import { pushPath } from 'redux-simple-router'
import { connect } from 'react-redux'
import Spinner from 'components/global/spinner'
import { setActiveFilterValue, fetchFilters } from 'actions/filters'

const FILTERIDX=2
class TruckMake extends Component {



	render () {
	 var { truck, active, onClick } = this.props
	 var className = 'general-button truck-make'
	 return (
		 <div className="grid-content small-6">
			 <a href="#" className={active()} onClick={onClick}>{truck.Name}</a>
		 </div>
	 )
 	}
}

class TruckMakes extends Component {

	componentDidMount() {
		const { dispatch, app } = this.props
		dispatch(fetchFilters(FILTERIDX, app))
	}

	 setTruckMake(id) {
		const { dispatch } = this.props;
		if (id) {
			dispatch(setActiveFilterValue(FILTERIDX, id))
		}

		dispatch(pushPath('/hub-selection/axel-type'));
	 }

	setActive(selected) {
 		const { app } = this.props;
 		const baseClass = 'general-button truck-make'
 		if (app.filterState[FILTERIDX] === selected) {
 		    return baseClass + ' active';
 		}
 		return baseClass;
 	}


	render() {
		const { app } = this.props;
		return (
			<div className="grid-container main-content">
				<h1>Choose the Truck Make</h1>
				<Spinner isFetching={app.isFetching} />
				<div className="grid-block">
					{app.filterResults.map((result, index) => {
						var boundClick = this.setTruckMake.bind(this, result.Id);
						var boundActive = this.setActive.bind(this, result.Id);
						return <TruckMake key={result.Id} app={app} truck={result} active={boundActive} onClick={boundClick}/>
					})}
				</div>
			</div>
		)
	}
}
export default connect()(TruckMakes)
