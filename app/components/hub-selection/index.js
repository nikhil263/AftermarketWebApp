import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import App from 'components/app'

export default class extends Component {
	render() {
		return (
			<App>
				<div className="grid-block step-bar shrink">
						<div className="grid-content noscroll">
						<ul className="button-group">
							<li><Link to="/hub-selection">Step 1</Link></li>
							<li><Link to="/hub-selection/step-two">Step 2</Link></li>
							<li><Link to="/hub-selection/step-two">Step 3</Link></li>
							<li><Link to="/hub-selection/step-two">Step 4</Link></li>
						</ul>
						</div>
					</div>
					<div className="grid-block wrap align-center shrink wrap main-content">
						{this.props.children}
					</div>
			</App>
		)
	}
};
