import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection'
import { pushPath } from 'redux-simple-router'
import { connect } from 'react-redux'

class FindAssembly extends Component {

	handleClick(path) {
		const { dispatch } = this.props;
		dispatch(pushPath(path))
	}

	render() {
		return (
			<div className="grid-container main-content">
				<h1>Do you know your hub's  assembly number?</h1>

				<iframe width="100%" height="300px" src="https://www.youtube.com/embed/q0RggNhTSiY?frameborder=0&allowfullscreen=true" ></iframe>
					<div className="conmet-button">
						<button onClick={this.handleClick.bind(this,'/hub-selection/find-assembly-detail')} className="yes-no-button"><em>Read</em> More about finding your assembly number.</button>
					</div>

				<div className="conmet-button">
					<button onClick={this.handleClick.bind(this,'/hub-selection/search')} className="yes-no-button"><em>Yes</em>I know my number now.</button>
				</div>
				<div className="conmet-button">
					<button onClick={this.handleClick.bind(this, '/hub-selection/truck-type')} className="yes-no-button">
						<em>No</em>I still don't know, proceed without it.</button>
				</div>


			</div>
		)
	}
};

export default connect()(FindAssembly);
