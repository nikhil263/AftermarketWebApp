import React from 'react';
import { Link } from 'react-router';

class ReplacementDrum extends React.Component {
	render() {
		return (
			<div className="grid-container main-content replacement-drum">
				<h2>Do you know your drum number?</h2>
				<div className="conmet-button" >
					<Link to='/hub-selection/replacement-drum/search' className="yes-no-button">
						<em>Yes</em>I know the drum number
					</Link>
				</div>
				<div className="conmet-button">
					<Link to='/hub-selection/replacement-drum/filter' className="yes-no-button">
						<em>No</em>Proceed without the number
					</Link>
				</div>
			</div>
		)
	}
};

export default ReplacementDrum
