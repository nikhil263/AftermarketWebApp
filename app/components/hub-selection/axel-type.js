import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Spinner from 'components/global/spinner';
import { fetchFilters } from 'actions/filters';
const FILTERIDX=4;
const NEXT_GAWR_FILTER_PATH = '/hub-selection/gawr'

class Result extends Component {

  render() {
    const {result, active, onClick } = this.props;
    const unitized = result.AftermarketAxle === 'Unitized';
    return(
      <div className={active()}>
        <button className="yes-no-button" onClick={onClick}>
          <strong>{result.AftermarketAxle}</strong><br />
          <span>
              {unitized ? '' : 'Inner Bearing -'} {result.BearingDescriptionInboard}<br/>
              {unitized ? '' : 'Outer Bearing -'} {result.BearingDescriptionOutboard}
				</span>
        </button>
      </div>
    )
  }
}

class AxelType extends Component {

  componentDidMount() {
    const { dispatch, app } = this.props;
    dispatch(fetchFilters(FILTERIDX, app))
  }

  render() {
    const {app, setFilter, setActive } = this.props;

    if (app.isFetching || app.filterResults.length < 1) {
      return <Spinner isFetching={app.isFetching} />
    }

    return (
      <div className="grid-container main-content">
        <h2>Choose the Hub by Axle Type or Bearing Number:</h2>
        {
          app.filterResults.map((result, index) => {
            if((result.AftermarketAxleId == 10 || result.AftermarketAxleId == 11) && app.filterState.brkty == 1) {
              var boundClick = setFilter.bind(this, FILTERIDX, {aaxna: result.Id || result.AftermarketAxleId}, app);
            }
            else {
              var boundClick = setFilter.bind(this, FILTERIDX, {aaxna: result.Id || result.AftermarketAxleId}, app.NEXT_FILTER_PATH = NEXT_GAWR_FILTER_PATH);
            }
            var boundActive = setActive.bind(this, FILTERIDX, result.Id || result.AftermarketAxleId);
            return <Result key={index} result={result} onClick={boundClick} active={boundActive} />
          })
        }
      </div>
    )
  }
}
export default connect()(AxelType)
