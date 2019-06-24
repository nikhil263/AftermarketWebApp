import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection'
import Meta from 'components/hub-selection/details/meta';
import {Link} from 'react-router';

export default class extends Component {
	render() {
		return (
			<div className="grid-container main-content">
				<h2>Email Product</h2>
				<Meta />
				<div className="error">
				 <p>Invalid Email Address</p>
				</div>
				<form>
					<input className="conmet-single-input" type="text" placeholder="Email Address" />
					<button className="button general-button">Send</button>
				</form>
			</div>
		)
	}
};
