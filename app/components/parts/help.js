import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection'
import { pushPath } from 'redux-simple-router'
import { connect } from 'react-redux'

class Help extends Component {

	handleClick(path) {
		const { dispatch } = this.props;
		dispatch(pushPath(path))
	}

	render() {
		return (
			<div className="grid-container main-content">
				<h1>Do you know your hub assembly number?</h1>

				<iframe width="100%" height="300px" src="https://www.youtube.com/embed/9yVp9V2JuEs" frameborder="0" allowfullscreen></iframe>
					<div className="conmet-button">
						<button onClick={this.handleClick.bind(this,'/parts/help/detail')} className="yes-no-button"><em>Read</em> about finding your assembly number.</button>
					</div>

				<div className="conmet-button">
					<button onClick={this.handleClick.bind(this,'/parts/search')} className="yes-no-button"><em>Yes</em>I know my number now.</button>
				</div>


			</div>
		)
	}
};

export default connect()(Help);
