import React, { PropTypes, Component } from 'react';
import {Link} from 'react-router';

export default class extends Component {
	render() {
		return (
			<div className="grid-container main-content">
				<h1>Success! The following ConMet PreSet hub(s) are recommended</h1>
				<img className="product-image" src={require('../../images/hub-fpo.png')} alt="Hub FPO" width="200" height="200"/>
				<h2>PreSet&#174; Plus&#8482; Hubs.<br />
				#10032998
				</h2>

				<Link to="/hub-selection/details" className="general-button">See Details</Link>

				{/*<div className="conmet-button">
				<Link to="/hub-selection/step-three" className="yes-no-button">Find this Product</Link>
				</div>*/}
			</div>
		)
	}
};
