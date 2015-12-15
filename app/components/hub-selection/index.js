import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import App from 'components/app'

export default class extends Component {
	render() {
		return (
			<App>
				<div className="step-bar grid-block small-12 large-12 wrap shrink ">

				<div className="grid-content noscroll">
					<ul className="button-group">
							<li><Link to="/hub-selection">Step 1</Link></li>
							<li><Link to="/hub-selection/step-two">Step 2</Link></li>
							<li><Link to="/hub-selection/step-three">Step 3</Link></li>
							<li><Link to="/hub-selection/step-four">Step 4</Link></li>
					</ul>
				</div>
				</div>

				<div className="grid-content">
					<div className="grid-container main-content">
					{this.props.children}
					</div>
				</div>


			</App>
		)
	}
};
