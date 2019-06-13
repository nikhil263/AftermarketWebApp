import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class PartsChoosePath extends React.Component {
    render () {
        return (
            <div className="grid-container main-content">
                <h2>What are you looking for?</h2>

                <Link to="/parts/search" className="general-button">Hub Components by Assembly</Link>
                <a href="https://conmet.com/wp-content/uploads/2018/10/Wheel-Bearing-Cross-Reference-002.pdf" target="_blank" className="general-button">Bearing Cross Reference</a>
                <a href="https://conmet.com/wp-content/uploads/2018/10/ConMet-Wheel-Seal-Cross-Reference-1.pdf" target="_blank" className="general-button">Seal Cross Reference</a>
                {/*<a href="https://hubcatalog.conmet.com/StudChart.aspx" target="_blank" className="general-button">Stud Chart</a>*/}
            </div>
        );
    }
}

export default connect()(PartsChoosePath);
