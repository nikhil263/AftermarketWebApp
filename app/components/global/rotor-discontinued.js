import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class RotorDiscontinued extends Component {
	render() {
        const { selectedRotorNumber } = this.props;
		return (
            <div>
                <h2>Sorry, the {selectedRotorNumber} rotor has been discontinued. </h2>
                <div className="not-found text-center" style={{ fontSize: '1.2rem' }}>
                    A new hub/rotor assembly will be required.
                </div>
                <div>
                    <Link to="/hub-selection/truck-type" className="general-button">Search for Replacement Hub/Rotor</Link>
                </div>
            </div>
		)
	}
}

export default connect()(RotorDiscontinued)
