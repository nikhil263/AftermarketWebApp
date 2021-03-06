import React, { PropTypes, Component } from 'react';
import  { connect } from 'react-redux';
import { pushPath } from 'redux-simple-router';
import Spinner from 'components/global/spinner';
import { fetchFilters } from 'actions/filters';

const FILTERIDX = 11;

class Result extends Component {

  convertToKg() {
    const { result } = this.props;
    let maxKg, minKg;
    maxKg = Math.round(result.MaxGawrPound * 0.453592).toLocaleString();
    minKg = Math.round(result.MinGawrPound * 0.453592).toLocaleString();

    return(
      <span>({minKg}-{maxKg} kg)</span>
    )
  }

  render() {
    const {active, onClick, result} = this.props;
    let min, max, display;

    min = result.MinGawrPound.toLocaleString();
    max = result.MaxGawrPound.toLocaleString();

    if (min === '0') {
      display = 'Up to '+max+' lbs.'
    } else {
      display = min +' - ' + max+' lbs.'
    }

    return (
      <div className={active()}>
        <button className="yes-no-button" onClick={onClick}><strong>{display}</strong><br />
          {this.convertToKg()}
        </button>
      </div>
    )
  }
}

class GAWR extends Component {

  componentWillMount() {
    const { dispatch, app } = this.props;
    const { brkty, aaxna } = app.filterState;
    const skipGawrFilter = brkty === 1 && aaxna === 4;

    if (skipGawrFilter) {
      dispatch(pushPath('/hub-selection/axle-stud'));
    } else {
      dispatch(fetchFilters(FILTERIDX, app));
    }
  }

  render() {
    const {app, setFilter, setActive} = this.props;

    if (app.isFetching || app.filterResults.length < 1) {
      return <Spinner isFetching={app.isFetching} />
    }

    return (
      <div className="grid-container main-content">
        <h2>Choose the GAWR <br />(Gross Axle Weight Rating):</h2>
        {
          app.filterResults.map((result, index) => {
            var boundClick = setFilter.bind(this, FILTERIDX, {gawrr: result.Id}, app);
            var boundActive = setActive.bind(this, FILTERIDX, result.Id);
            return <Result key={index} result={result} onClick={boundClick} active={boundActive} />
          })
        }
      </div>
    )
  }
}

export default connect()(GAWR)
