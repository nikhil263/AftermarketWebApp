import React, { PropTypes, Component } from 'react';
import {Link} from 'react-router';

export default class extends Component {
	render() {
		return (
				<div className="meta">
					<img className="product-image" src={require('../../../images/hub-fpo.png')} alt="Hub FPO" width="100" height="100"/>
					FF Front Steer Axle Aluminum PreSet Plus Hub Assembly<br />
					<em>#10032998</em>
				</div>
			)
	}
};