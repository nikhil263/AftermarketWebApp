import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection'
import { pushPath } from 'redux-simple-router'
import { connect } from 'react-redux'

class Help extends Component {

	handleClick(path) {
		const { dispatch } = this.props;
		dispatch(pushPath(path))
	}

    handleLink(url) {
        window.location = url;
    }

	render() {
		return (
			<div className="grid-container main-content">
				<h1>Do you know your hub assembly number?</h1>

				<iframe width="100%" height="300px" src="https://www.youtube.com/embed/9yVp9V2JuEs" frameborder="0" allowfullscreen></iframe>

				<div className="conmet-button">
					<button onClick={this.handleClick.bind(this,'/hub-selection/find-assembly-detail')} className="yes-no-button"><em>Read</em> More about finding your assembly number.</button>
				</div>

				<div className="conmet-button">
					<button onClick={this.handleLink.bind(this,' https://www.conmet.com/legal/contact-information/')} className="yes-no-button"><em>Contact</em>Customer service for support.</button>
				</div>

			</div>
		)
	}
};

export default connect()(Help);
