import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection';
import Specs from 'components/hub-selection/details/specs';
import Description from 'components/hub-selection/details/description';
import Meta from 'components/hub-selection/details/meta';
import {Link} from 'react-router';

export default class extends Component {
	render() {
		return (
			<HubSelection>
				<h2>Product Details</h2>
				<Meta />
				<Description />
				<Specs />

				<Link to="/hub-selection/email" className="general-button">Email Results</Link>
				<Link to="/hub-selection/step-three" className="general-button">Find this Product</Link>
				
			</HubSelection>
		)
	}
};
