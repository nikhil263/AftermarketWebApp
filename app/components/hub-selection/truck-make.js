import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection';

import {Link} from 'react-router';

export default class extends Component {
	constructor(props) {
		super(props);
		this.state = {
			truckMake: 'Freightliner'
		};
		this.truckList = [
			'Freightliner', 'Western Star', 'Sterling', 'Kenworth',
			'Peterbilt', 'Volvo', 'Mack', 'Navistar'
		]
	}

	setTruckMake(val) {
		this.state = this.setState('truckMake', val);
		console.log(this.state);
	}

	setState(k, v){
		var obj = {}
		obj[k] = v;
		return Object.assign({}, this.state, obj);
	}

	render() {


		var trucks = this.truckList.map((truck, index) => {
			return <div className="grid-content small-6">
			<a href="#" className="general-button" onClick={this.setTruckMake.bind(this, truck)} key={index}>{truck}</a>
			</div>
		});

		return (
			<HubSelection>
				<h1>Choose the Truck Make</h1>

				<div className="grid-block">
				{trucks}
				</div>

			</HubSelection>
		)
	}
};
