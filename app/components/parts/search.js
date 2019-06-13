import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { pushPath } from 'redux-simple-router';
import { Link } from 'react-router';
import Autocomplete from 'react-autocomplete';
import { fetchHubAssemblyNumber } from 'actions';

class PartsSearch extends Component {
  constructor(props) {
    super(props);
    this.doSearch = this.doSearch.bind(this);

    this.state = {
      value: '',
      assemblyNumber: [],
      loading: false,
      url: '',
    };
  }

  doSearch(e) {
    e.preventDefault();
    this.hubAssemblyFilters();
  }

  hubAssemblyFilters(id) {
    const { dispatch } = this.props;
    if (id) {
      dispatch(pushPath('/parts/search/' + id));
    } else {
      if (this.state.assemblyNumber.length === 1) {
        dispatch(pushPath('/parts/search/' + this.state.assemblyNumber[0]));
      }
    }
  }

  render() {
    return (
      <div className="grid-container main-content">
        <h2>Enter your hub assembly number</h2>
        <form id="autoComplete">
          <Autocomplete
            value={this.state.value}
            inputProps={{
              placeholder: '6 or 8 digit assembly number (10031065)',
              className: 'assembly-number',
              id: 'assemblyNumber',
              type: 'text',
            }}
            wrapperStyle={{ position: 'relative', display: 'block', margin: '0 0 1rem 0' }}
            items={this.state.assemblyNumber}
            getItemValue={item => item}
            onSelect={(value, state) => {
              this.hubAssemblyFilters(state);
              this.setState({ value, assemblyNumber: [state] });
            }}
            onChange={(event, value) => {
              this.setState({ value, assemblyNumber: [], loading: true });
              if (value !== '') {
                this.props.dispatch(fetchHubAssemblyNumber(value, true)).then(() => {
                  let results = this.props.results.assemblyNumber.Results;
                  if (results) {
                    this.setState({ assemblyNumber: this.props.results.assemblyNumber.Results, loading: false });
                  } else {
                    this.setState({ assemblyNumber: [], loading: false });
                  }
                });
              }
            }}
            renderItem={(item, isHighlighted) => (
              <div
                className="menu-item"
                style={{ background: isHighlighted ? 'lightgray' : 'white' }}
                key={item}
              >
                {item}
              </div>
            )}
            renderMenu={(items, value) => (
              <div className="menu">
                {value === '' || value.length < 3 ? (
                  <div className="item">Type ConMet or Competitor assembly number</div>
                ) : this.state.loading ? (
                  <div className="item">Loading...</div>
                ) : items.length === 0 ? (
                  <div className="item">No matches for {value}</div>
                ) : (
                  items
                )}
              </div>
            )}
          />
          <button type="submit" className="button general-button" onClick={this.doSearch}>
            Continue
          </button>
          <Link to={'/parts/help'} className="general-button">
            Help me find my hub assembly number
          </Link>
        </form>
      </div>
    );
  }
}

export default connect()(PartsSearch);
