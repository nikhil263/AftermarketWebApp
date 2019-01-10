import React, { PropTypes, Component } from 'react';
import { pushPath } from 'redux-simple-router';
import { connect } from 'react-redux';
import { fetchDrumFilterValues, fetchDrumFilterCategories, resetDrumFilter } from 'actions';
import Waiting from 'components/global/waiting';
import DrumResult from './drumResult';

class ReplacementDrumFilter extends Component {

  constructor(props) {
    super(props);
    this.getFilterValue = this.getFilterValue.bind(this);
    this.handleFilterClick = this.handleFilterClick.bind(this);

    this.state = {
      filters: [],
      urlParams: '',
      isResult: false,
      skipFilter: {},
      filterClicked: false,
    };
  }

  componentWillMount(){
    const { dispatch } = this.props;
    dispatch(resetDrumFilter());
    dispatch(fetchDrumFilterCategories());
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(resetDrumFilter());
  }

  componentDidMount() {
    this.getFilterValue();
  }

  getFilterValue() {
    const { results, params, dispatch } = this.props;
    const { drumFilters, drumFilterValue } = results;
    const { filters, urlParams, currentFilter, isResult, skipFilter } = this.state;

    this.state.urlParams = params.filters ? params.filters : '';

    if (drumFilters.length) {
      this.state.filters = drumFilters.map((item) => item.QueryParameterName);
    }

    let filterParams = params.filters ? '?inclv=2&'+params.filters : '?inclv=2';
    this.state.url = filterParams;

    if (drumFilters.length && !params.currentFilter) {
      dispatch(pushPath('/hub-selection/replacement-drum/filter/'+this.state.filters[1]));
      this.state.skipFilter = []; // when back button is pressed
    } else if (params.currentFilter !== this.state.currentFilter) {
      if (results.currentFilter !== 'brnum' || !isResult) {


        dispatch(fetchDrumFilterValues(params.currentFilter, filterParams));
        this.state.currentFilter = params.currentFilter;
      }

      if (results.currentFilter === 'brnum' && isResult && drumFilterValue && drumFilterValue[0] && drumFilterValue[0].BrakeDrumNumber) {
        this.state.isResult = false;
      }

      if (currentFilter === 'bcdia') {
        dispatch(fetchDrumFilterValues(filters[0], filterParams));
      }
      this.state.filterClicked = false;
    } else if (drumFilterValue.length === 1 && results.isFilterValueSingle && currentFilter && drumFilters.length) {
      const index = filters.indexOf(results.currentFilter);
      const id = drumFilterValue[0].Id !== undefined ? drumFilterValue[0].Id : drumFilterValue[0];

      if (this.state.url === '') {
        this.state.url = filterParams;
      }
      if (results.currentFilter === 'bcdia') {
        this.state.url += '&'+filters[0]+'='+id;
        dispatch(fetchDrumFilterValues(filters[0], this.state.url));
        this.state.currentFilter = 'brnum';
        this.state.isResult = true;
        this.state.skipFilter = [];
      } else {
        this.state.url += '&'+filters[index]+'='+id;
        if (this.state.filterClicked) {
          this.state.skipFilter = {...skipFilter, [filters[index]]: id};
        }
        this.state.filterClicked = false;
        dispatch(fetchDrumFilterValues(filters[index + 1], this.state.url, false));
      }
    }
  }

  handleFilterClick(id) {
    const { dispatch, results } = this.props;
    const { currentFilter } = results;
    const { filters, urlParams, skipFilter} = this.state;
    const index = currentFilter === 'bcdia' ? -1 : filters.indexOf(currentFilter);
    this.state.filterClicked = true;
    this.state.urlParams += urlParams === '' ? currentFilter+'='+id : '&'+currentFilter+'='+id;

    let url = this.state.urlParams;
    if (skipFilter !== undefined) {
      const skippedFilter = Object.keys(skipFilter);
      if (skippedFilter.length) {
        url += '&'+skippedFilter.map((key) => key+'='+skipFilter[key]).join('&');
      }
      this.state.skipFilter = [];
    }

    dispatch(pushPath('/hub-selection/replacement-drum/filter/'+filters[index + 1]+'/'+url));
  }

  componentDidUpdate() {
    this.getFilterValue();
  }

  render() {
    const { results } = this.props;
    const { drumFilterValue, currentFilter } = results;
    const isResult = drumFilterValue && drumFilterValue[0] && drumFilterValue[0].BrakeDrumNumber;

    if (results.isFetching) {
      return (<Waiting />)
    }
    if (currentFilter === 'bcdia' || currentFilter === 'pidia' || currentFilter === 'shwid' || currentFilter === 'szdia' && currentFilter !== 'brnum' && !isResult) {
      let message = '';

      if (currentFilter === 'pidia') {
        message = 'Choose the pilot diameter';
      } else if (currentFilter === 'bcdia') {
        message = 'Choose the bolt circle diameter';
      } else if (currentFilter === 'shwid') {
        message = 'Choose the shoe width';
      } else if (currentFilter === 'szdia') {
        message = 'Choose the brake diameter';
      }

      return (
        <div className="grid-container main-content replacement-drum">
          <h1>{message}</h1>
          {
            currentFilter === 'pidia' ? <img className="product-image" src={require('../../images/pidia.png')} alt="Pilot Diameter"  width="300" height="300 " /> : null
          }
          <div className="grid-content">
            {drumFilterValue.map((item) => {
              return (
                <div className="small-12" key={item}>
                  <div className="conmet-button">
                    <button className="yes-no-button bold" onClick={() => this.handleFilterClick(item)}>
                      ⌀ {item} inch {currentFilter === 'pidia' && item === 8.78 ? '- Most common' : ''}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
    }

    if (currentFilter === 'holes') {
      return (
        <div className="grid-container main-content replacement-drum">
          <h1>Choose the Stud Hole count</h1>
          <div className="grid-content">
            {drumFilterValue.map((item) => {
              return (
                <div className="small-12" key={item}>
                  <div className="conmet-button">
                    <button className="yes-no-button bold" onClick={() => this.handleFilterClick(item)}>
                      {item}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
    }

    if (currentFilter === 'tmake' && currentFilter !== 'brnum' && !isResult) {
      return (
        <div className="grid-container main-content replacement-drum">
          <h1>Choose the truck make</h1>
          <div className="grid-content">
            {drumFilterValue.map((item) => {
              return (
                <div className="small-12" key={item.Id}>
                  <div className="conmet-button">
                    <button className="yes-no-button bold" onClick={() => this.handleFilterClick(item.Id)}>
                      {item.Name}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
    }

    if (currentFilter === 'axpos' && currentFilter !== 'brnum' && !isResult) {
      return (
        <div className="grid-container main-content replacement-drum">
          <h1>Choose the axle position</h1>
          <div className="grid-content">
            {drumFilterValue.map((item) => {
              return (
                <div className="small-12" key={item.Id}>
                  <div className="conmet-button">
                    <button className="yes-no-button bold" onClick={() => this.handleFilterClick(item.Id)}>
                      {item.Name}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
    }

    return (
      <div>
        {
          isResult ? <DrumResult drumResult={drumFilterValue} /> : <div />
        }
      </div>
    )
  }
};

export default connect()(ReplacementDrumFilter);
