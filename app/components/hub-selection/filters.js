import React, {PropTypes, Component} from 'react';
import {fetchFilterValues, fetchHubsCrossApi, fetchHubsSpindleNut, invalidateHubStuds} from 'actions';
import {fetchCategories} from 'actions/categories';
import {pushPath} from 'redux-simple-router';
import {connect} from 'react-redux';
import Spinner from '../global/spinner';
import Result from './details/hub-results';
import HubSingleResult from './details/result';
import ResultNavigation from './details/result-navigation';

class Filters extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filters: [],
      filter_name: [],
      current_filter: null,
      results: [],
      isFetching: false,
      spindleNut: "",
      url: ''
    };
  }

  componentWillMount() {
    let filters = this.props.params.filters;
    this.props.dispatch(fetchCategories()).then(() => {
      if (filters) {
        this.setFilters(filters);
      }
    });
  }

  componentWillReceiveProps(newProps) {
    if (this.state.url && this.state.url !== newProps.params.filters) {
      this.setFilters(newProps.params.filters);
    }
  }

  setFilters(filters) {
    let result = {};
    filters.split('&').forEach(function (x) {
      let arr = x.split('=');
      arr[1] && (result[arr[0]] = arr[1]);
    });
    this.state.filters = result;
    this.state.url = filters;

    let categories = this.props.app.categories;
    let j = 0;

    Object.keys(categories).forEach((key) => {
      if (result.hasOwnProperty(categories[key].QueryParameterName) === false && categories[key].QueryParameterName !== 'tmake' && categories[key].QueryParameterName !== 'gawrr') {
        this.state.filter_name[j] = categories[key].QueryParameterName;
        j++;
      }
    });

    this.getFilterValues();
  }

  getFilterValues() {
    const {dispatch} = this.props;

    if (this.state.current_filter === 'hatyp' || this.state.filter_name[0] === undefined || this.state.filter_name[0] === 'hatyp') {
      this.hubCrossApi();

      // Fetch Hub Studs
      const { filters } = this.state;
      if (filters && filters["wmslc"] === '1') {
        const t = Object.keys(filters)
          .filter(key => key !== 'hanum')
          .map(key => [key, filters[key]].map(encodeURIComponent).join('='))
          .join('&');
        const studFilter = t.toLowerCase().replace('wmslc=1', 'wmslc=2');
        dispatch(fetchHubsCrossApi(studFilter, true));
      } else {
        dispatch(invalidateHubStuds());
      }

    } else {
      dispatch(fetchFilterValues(this.state.filter_name[0], this.state.url)).then(() => {
        let results = this.props.results.filter_value.Results;
        this.setState({current_filter: this.state.filter_name[0], isFetching: false, results: []});
        this.state.filter_name.shift();

        // if(this.state.current_filter === 'gawrr'){
        //     if(results.CanSkipThisFilter !== undefined && results.CanSkipThisFilter){
        //         this.state.filter_name[this.state.current_filter] = 0;
        //         this.getFilterValues();
        //     }
        // }

        if (results.length === 1) {
          this.state.filter_name[this.state.current_filter] = results[0].Id;
          this.getFilterValues();
        }
      });
    }
  }

  handleFilterClick(e) {
    e.preventDefault();
    this.state.isFetching = true;
    let id = e.target.id;
    if (id) {
      let url = this.state.url;
      url += '&' + this.state.current_filter + '=' + id;
      this.props.dispatch(pushPath('/hub-selection/filters/' + url));
    }
  }

  hubCrossApi() {
    let url = this.state.url;
    url += '&inclv=1';
    let _self = this;
    this.props.dispatch(fetchHubsCrossApi(url)).then(() => {
      _self.setState({results: _self.props.results.items.Results});
      let partNumber = "";
      _self.state.results.map((item, id) => {
        partNumber += (id + 1 === _self.state.results.length) ? item.HubAssemblyNumber : item.HubAssemblyNumber + ",";
      });

      _self.props.dispatch(fetchHubsSpindleNut(partNumber)).then(() => {
        let spindleNut = "";
        if (_self.props.results.spindleNut !== undefined) {
          _self.props.results.spindleNut[0].AftermarketParts.map((item, id) => {
            let washer_description = '';
            if (item.Description.toLowerCase().includes('hub service kit') && item.Description.toLowerCase().includes('ff')) {
              if (item.TypeId === 226) {
                washer_description = ' (D Flat)';
              } else if (item.TypeId === 227) {
                washer_description = ' (Keyway)';
              }
            }

            spindleNut += (id + 1 === _self.props.results.spindleNut[0].AftermarketParts.length ? item.PartNumber + (washer_description) : item.PartNumber + (washer_description) + ",");
          });
          _self.setState({spindleNut: spindleNut});
        }
      });
    });
  }

  render() {
    let current_filter = this.state.current_filter;
    let isFetching = this.state.isFetching;
    let filter_value = this.props.results.filter_value.Results;
    let results = this.state.results;
    const {results: {short_studs}} = this.props;

    if (this.props.results.isSpindleNutFetching) {
      return (
        <Spinner isFetching={true}/>
      )
    }

    if (current_filter === 'gawrr' && filter_value[0] && filter_value[0].Id && !isFetching && !(results.length > 0)) {
      return (
        <div className="grid-container main-content">
          <h1>Choose the GAWR (Gross Axle Weight Rating)</h1>
          <div className="grid-content">
            {filter_value.map((key) => {
              return <div className="small-12" key={key.Id}>
                <div className="conmet-button">
                  <button className="yes-no-button bold" id={key.Id} onClick={this.handleFilterClick.bind(this)}>
                    {key.DisplayRange}
                  </button>
                </div>
              </div>
            })}
          </div>
        </div>
      )
    } else if (current_filter === 'wmslc' && !isFetching && !(results.length > 0)) {
      return (
        <div className="grid-container main-content">
          <h1>Choose the wheel type (determine wheel stud length)</h1>
          <div className="grid-content">
            {filter_value.map((key) => {
              return <div className="small-12" key={key.Id}>
                <div className="conmet-button">
                  <button className="yes-no-button bold" id={key.Id} onClick={this.handleFilterClick.bind(this)}>
                    {key.WheelMaterial} - {key.StudLengthClass}
                  </button>
                </div>
              </div>
            })}
          </div>
        </div>
      )
    } else if ((current_filter === 'hcmty' || current_filter === 'hatyp') && !isFetching && !(results.length > 0)) {
      return (
        <div className="grid-container main-content">
          <h1>{current_filter === 'hcmty' ? 'Choose the hub material' : 'Choose the hub assembly type'}</h1>
          <div className="grid-content">
            {filter_value.map((key) => {
              return <div className="small-12" key={key.Id}>
                <div className="conmet-button">
                  <button className="yes-no-button bold" id={key.Id} onClick={this.handleFilterClick.bind(this)}>
                    {key.Name}
                  </button>
                </div>
              </div>
            })}
          </div>
        </div>
      )
    } else if ((results.length > 0) && (results.length === 2)) {
      return (
        <Result
          results={results}
          short_studs={short_studs}
          spindleNut={this.state.spindleNut}
          selectedHubAssemblyNumber={this.props.results.selectedHubAssemblyNumber}
        />
      )
    } else if (results.length > 0) {
      return (
        <div>
          {this.props.results.items.Results.map((item, index) => {
            if (index === this.props.results.selectedIdx) {
              return (
                <HubSingleResult
                  key={index}
                  item={item}
                  idx={this.props.results.selectedIdx}
                  spindleNut={this.state.spindleNut}
                  total={this.props.results.total}
                  selectedHubAssemblyNumber={this.props.results.selectedHubAssemblyNumber}
                  short_studs={short_studs}
                />
              )
            }
          })}
          <ResultNavigation total={this.props.results.total} currentIdx={this.props.results.selectedIdx}/>
        </div>
      )
    } else {
      return (
        <Spinner isFetching={true}/>
      )
    }
  }
};

export default connect()(Filters);
