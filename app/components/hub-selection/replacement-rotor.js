import React from 'react';
import { Link } from 'react-router';

class ReplacementRotor extends React.Component {
    render() {
        return (
            <div className="grid-container main-content replacement-drum">
                <h1>Do you know your rotor number?</h1>
                <div className="conmet-button" >
                    <Link to='/hub-selection/replacement-rotor/search' className="yes-no-button">
                        <em>Yes</em>I know the rotor number
                    </Link>
                </div>
                <div className="conmet-button">
                    <Link to='/hub-selection/replacement-rotor/filter' className="yes-no-button">
                        <em>No</em>Proceed without the number
                    </Link>
                </div>
            </div>
        )
    }
}

export default ReplacementRotor
