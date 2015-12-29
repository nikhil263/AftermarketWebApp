import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection';

import {Link} from 'react-router';

export default class extends Component {
	static contextTypes = {
  	history: PropTypes.object,
		store: PropTypes.object
  };

	constructor(props, context) {
		super(props, context);
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
		const { store } = this.context;
		const state = store.getState();

		var trucks = state.truckTypes.map((truck, index) => {
			return <div className="grid-content small-6">
			<a href="#" className="general-button truck-make" onClick={this.setTruckMake.bind(this, truck)} key={index}>{truck}</a>
			</div>
		});
		return (
			<div className="grid-container main-content">
				<h1>Choose the Truck Make</h1>

				<div className="grid-block">
				{trucks}
				</div>

			</div>
		)
	}
};
