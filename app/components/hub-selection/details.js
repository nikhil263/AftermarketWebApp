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
				<div className="conmet-button">
					<Link to="/hub-selection/email" className="yes-no-button">Email Results</Link>
				</div>
				<div className="conmet-button">
					<Link to="/hub-selection/step-three" className="yes-no-button">Find this Product</Link>
				</div>
			</HubSelection>
		)
	}
};
