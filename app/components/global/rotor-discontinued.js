import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class RotorDiscontinued extends Component {
	render() {
        const { selectedRotorNumber } = this.props;
		return (
            <div>
                <h1>Sorry, the {selectedRotorNumber} rotor has been discontinued. </h1>
                <div className="not-found text-center">
                    A new hub/rotor assembly will be required.
                </div>
                <div>
                    <Link to="/hub-selection/search" className="general-button">Search for Replacement Hub/Rotor</Link>
                </div>
            </div>
		)
	}
}

export default connect()(RotorDiscontinued)
