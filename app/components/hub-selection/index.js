import React, { PropTypes, Component } from 'react';
import App from 'components/app'

export default class extends Component {
	render() {
		return (
			<App>
				<div className="grid-block step-bar shrink">
						<div className="grid-content noscroll">
						<ul className="button-group">
							<li><a href="#">Button I</a></li>
							<li><a href="#">Button II</a></li>
							<li><a href="#">Button III</a></li>
							<li><a href="#">Button I</a></li>
						</ul>
						</div>
					</div>
					<div className="grid-block wrap align-center shrink wrap main-content">
						<div className="grid-block align-center small-12">
							<div className="grid-content medium-6">
								<h2>Hub Selection</h2>
							</div>
						</div>
						{this.props.children}
					</div>
			</App>
		)
	}
};
