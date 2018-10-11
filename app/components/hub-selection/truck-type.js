import React, { PropTypes, Component } from 'react';
import { TRUCK, TRAILER, DISC, DRUM, FILTERIDX } from '../../config/constants';
import { connect } from 'react-redux';
import { setActiveFilterValue, fetchFilters, resetAppState } from 'actions/filters';

class TruckType extends Component {
    componentDidMount() {
        const {dispatch } = this.props;
        dispatch(resetAppState());
    }

    render() {
        const { app, setFilter, setActive } = this.props;
        return (
            <div className="grid-container main-content">
                <h1>Are you looking for a hub for your</h1>
                <div className="grid-block">
                    <div className="grid-content small-6">
                        <div className={setActive(FILTERIDX, TRUCK)}>
                            <button className="yes-no-button" onClick={setFilter.bind(this, FILTERIDX, {tcomp: TRUCK, brkty: DRUM}, app)}>
                                <strong>Truck with Drum Brakes</strong>
                            </button>
                        </div>
                        <div className={setActive(FILTERIDX, TRUCK)}>
                            <button className="yes-no-button" onClick={setFilter.bind(this, FILTERIDX, {tcomp: TRUCK, brkty: DISC}, app)}>
                                <strong>Truck with Disc Brakes</strong>
                            </button>
                        </div>
                    </div>
                    <div className="grid-content small-6">
                        <div className={setActive(FILTERIDX, TRAILER)}>
                            <button className="yes-no-button" onClick={setFilter.bind(this, FILTERIDX, {tcomp: TRAILER, brkty: DRUM}, app)}>
                                <strong>Trailer with Drum Brakes</strong>
                            </button>
                        </div>
                        <div className={setActive(FILTERIDX, TRAILER)}>
                            <button className="yes-no-button" onClick={setFilter.bind(this, FILTERIDX, {tcomp: TRAILER, brkty: DISC}, app)}>
                                <strong>Trailer with Disc Brakes</strong>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect()(TruckType);
