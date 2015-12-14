import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection'

export default class extends Component {
	render() {
		return (
			<HubSelection>
				<div className="grid-block align-center wrap  small-12">
					<div className="grid-content medium-6">
							<h3>What are you looking for?</h3>
					</div>
				</div>
				<div className="grid-block align-center wrap">
					<div className="grid-content medium-6">
						<div className="conmet-button big-button">
							<h4>Replacement Hub</h4>
							<i className="icon-angle-right"></i>
							<p>Replace your hub with one of our kits</p>
						</div>
						<div className="conmet-button big-button">
							<h4>Replacement Parts</h4>
							<i className="icon-angle-right" title="Right Arrow"></i>
							<p>Replace your hub with one of our kits</p>
						</div>
					</div>
			</div>
		</HubSelection>
		)
	}
};
