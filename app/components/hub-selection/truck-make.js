import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection';
import { pushPath } from 'redux-simple-router'
import { connect } from 'react-redux'
import { setSelectedTruckMake } from 'actions'

class TruckMake extends Component {

	render () {
	 var { truck } = this.props
	 var className = 'general-button truck-make'
	 return (
		 <div className="grid-content small-6">
			 <a href="#" className={(truck.active) ? 'active ' + className :  className} onClick={this.props.onClick}>{truck.name}</a>
		 </div>
	 )
 	}
}

class TruckMakes extends Component {

	 setTruckMake(key, make) {
		const { hub, setHubState, dispatch, incrStep } = this.props;
			var newObj = {};
			newObj[key] = make.id;
			setHubState(newObj);
		dispatch(setSelectedTruckMake(make.id))
		incrStep();
	  dispatch(pushPath('/hub-selection/axel-type'));
	 }



	render() {
		const { hub, truckMakes } = this.props;
		return (
			<div className="grid-container main-content">
				<h1>Choose the Truck Make</h1>

				<div className="grid-block">
					{truckMakes.map((truck, index) => {
						var boundClick = this.setTruckMake.bind(this, 'truckMakeIds', truck);
						return <TruckMake key={index} truck={truck}  onClick={boundClick}/>
					})}
				</div>
			</div>
		)
	}
}
export default connect()(TruckMakes)
