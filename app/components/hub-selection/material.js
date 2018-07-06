import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import Spinner from 'components/global/spinner'
import { fetchFilters } from 'actions/filters'

const FILTERIDX=9;

class Result extends Component {
  render () {
    var { result, active, onClick, app } = this.props;
    const { brkty, tmake, aaxna } = app.filterState;
    const skipGawrFilter = brkty === 1 && tmake === 1 && aaxna === 4;
    const isAluminum = result.Name.toLowerCase() === 'aluminum';

    return (
      <div className="grid-content small-6">
        <div className={active()}>
          <button className="yes-no-button" onClick={onClick}>
            <strong>{result.Name}</strong>
						{
							skipGawrFilter ? (
								<div>
                  <div><strong>{ isAluminum ? 'Up to 23,000 lbs.' : '23,001 - 26,000 lbs.' }</strong></div>
                  <div><span>{ isAluminum ? '(0-10,433 kg)' : '(10,433-11,793 kg)' }</span></div>
								</div>
							) : null
						}
          </button>
        </div>
      </div>
    )
  }
}

class Material extends Component {

  componentDidMount() {
    const { dispatch, app } = this.props;
    dispatch(fetchFilters(FILTERIDX, app))
  }

  render() {
    const { app, setFilter, setActive } = this.props;
    if (app.isFetching || app.filterResults.length < 1) {
      return <Spinner isFetching={app.isFetching} />
    }
    return (
      <div className="grid-container main-content">
        <h1>Choose the Hub Material</h1>
        <div className="grid-block">
          {
            app.filterResults.map((result, index) => {
              var boundClick = setFilter.bind(this, FILTERIDX, {hcmty: result.Id}, app);
              var boundActive = setActive.bind(this, FILTERIDX, result.Id);
              return <Result key={result.Id} app={app} result={result} active={boundActive} onClick={boundClick}/>
            })
					}
        </div>
      </div>
    )
  }
}
export default connect()(Material)
