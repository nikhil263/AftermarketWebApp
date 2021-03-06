import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Spinner from 'components/global/spinner';
import { fetchFilters } from 'actions/filters';
import { IMAGE_CDN } from 'config/constants';
import { setRotorSpilned } from "../../actions/filters";
const FILTERIDX = 16;

class Result extends Component {
  render() {
    var { result, active, onClick, resultLength, app } = this.props;
    var className = resultLength === 2 ? 'grid-content small-6' : 'grid-content small-12';
    return (
      <div className={className}>
        <img
          className="product-image"
          src={IMAGE_CDN + result.ImageGuid + '.png'}
          alt={result.Name}
          width="200"
          height="200"
        />
        <div className={active()}>
          <button className="yes-no-button" onClick={() => onClick(result)}>
            <strong>{result.Name}</strong>
          </button>
        </div>
      </div>
    );
  }
}

class ChooseBrakeRotorType extends Component {
  render() {
    const { app, setFilter } = this.props;
    return (
      <div className="replacement-drum result">
        <h3>
          For Trailer applications, ConMet Flat Rotor Assemblies are offered as an alternative, direct-fit replacement
          for Bendix Splined
        </h3>
        <div className="details text-center">
          <img className="product-image" src={require('../../images/flat-rotor.png')} />
        </div>
        {app.filterResults.map((result, i) => {
          let boundClick = setFilter.bind(this, FILTERIDX, { abrty: result.Id }, app);
          if (i === 0) {
            return (
              <div key={i} className="general-button" onClick={boundClick}>
                See ConMet Flat Rotor
              </div>
            );
          }
          return (
            <div key={i} className="general-button" onClick={boundClick}>
              Continue to Bendix Splined
            </div>
          );
        })}
      </div>
    );
  }
}

class BrakeRotorType extends Component {
  constructor() {
    super();
    this.state = {
      showSplined: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { dispatch, app } = this.props;
    dispatch(fetchFilters(FILTERIDX, app));
  }

  handleClick(result) {
    const { setFilter, app } = this.props;
    const {
      filterState: { tcomp, brkty },
    } = app;

    if (
      tcomp === 2 &&
      (brkty === 1 || brkty === 2) && // Only for Trailer
      result.Name &&
      result.Name.toLowerCase() === 'splined'
    ) {
      this.setState({ showSplined: true });
    } else {
      this.setState({ showSplined: false });
      setFilter(FILTERIDX, { abrty: result.Id }, app);
    }
  }

  componentWillReceiveProps(newProps) {
    const { setFilter, app, dispatch } = newProps;
    const { isRotorSplined } = app;

    app.filterResults.forEach(result => {
      if (result.Name && result.Name.toLowerCase() === 'splined' && isRotorSplined) {
        setFilter(FILTERIDX, { abrty: result.Id }, app);
        dispatch(setRotorSpilned(false));
      }
    });
  }

  render() {
    const { app, setFilter, setActive } = this.props;
    const {
      filterState: { tcomp, brkty },
    } = app;
    const { showSplined } = this.state;
    if (app.isFetching || app.filterResults.length < 1) {
      return <Spinner isFetching={app.isFetching} />;
    }
    return (
      <div className="grid-container main-content">
        {showSplined ? (
          <ChooseBrakeRotorType app={app} setFilter={setFilter} />
        ) : (
          <div>
            <h2>Choose the brake rotor type</h2>
            <div className="grid-block">
              {app.filterResults.map(result => {
                let boundActive = setActive.bind(this, FILTERIDX, result.Id);
                return (
                  <Result
                    key={result.Id}
                    app={app}
                    result={result}
                    active={boundActive}
                    onClick={this.handleClick}
                    resultLength={app.filterResults.length}
                  />
                );
              })}
            </div>
            {tcomp === 2 &&
            (brkty === 1 || brkty === 2) && (
              <div className="text-center card card-divider">
                All ConMet Trailer Rotors are 430mm in diameter. Please confirm your rotor size
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
export default connect()(BrakeRotorType);
