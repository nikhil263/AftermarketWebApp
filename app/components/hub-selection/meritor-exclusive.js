import React from 'react';
import {connect} from 'react-redux';

class MeritorExclusive extends React.Component {
    render() {
        return (
            <div className="grid-container main-content">
                <h2>The entered hub is exclusive to Meritor.</h2>
                <div className="not-found">
                    <h2 style={{fontSize: '24px',textTransform: 'none'}}>Please contact Meritor for service enquiries.</h2>
                </div>
            </div>
        )
    }
}

export default connect()(MeritorExclusive);