import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {pushPath} from 'redux-simple-router';
import _ from 'lodash';
import {STUD_FILTERS} from "config/constants";
import {fetchStudFilterValues} from "actions";
import Spinner from 'components/global/spinner';
import StudResult from './studResult';

class StudFilter extends Component {
  constructor(props) {
    super(props);

    this.getFilterValue = this.getFilterValue.bind(this);
    this.handleFilterClick = this.handleFilterClick.bind(this);

    this.state = {
      cFilter: '',
      urlParams: '',
      skippedFilter: '',
      apiFilter: '', // current filter of which api is called.
    };
  }

  componentWillMount() {
    this.getFilterValue(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.getFilterValue(newProps);
  }

  getFilterValue(props) {
    const {params, dispatch, results: {isFetching, studFilterValue}} = props;
    const {currentFilter, filters} = params;
    const {cFilter, urlParams, skippedFilter} = this.state;

    if (!currentFilter) {
      dispatch(pushPath('/hub-selection/stud/filter/' + STUD_FILTERS[0]));
    } else if (!isFetching && cFilter !== currentFilter) {
      dispatch(fetchStudFilterValues(currentFilter, `${filters ? `${filters}&` : ''}inclv=2`));
      this.setState({cFilter: currentFilter, urlParams: (filters || ''), skippedFilter: '', apiFilter: currentFilter});
    } else if (!isFetching && studFilterValue && studFilterValue.length === 1) {
      // Skip the filter if only one option is available
      const item = studFilterValue[0];
      const id = item.Id ? item.Id : item;

      if (skippedFilter) {
        const index = STUD_FILTERS.indexOf(skippedFilter);
        const nextFilter = STUD_FILTERS[index + 1];

        if (nextFilter) {
          const f = nextFilter === 'sdnum' ? urlParams : `${skippedFilter}=${id}&${urlParams}`;
          this.setState({skippedFilter: nextFilter, apiFilter: nextFilter});
          dispatch(fetchStudFilterValues(nextFilter, `${f}&inclv=2`));
        }
      } else {
        const f = `${currentFilter}=${id}&${urlParams}`;
        this.setState({skippedFilter: currentFilter, urlParams: f, apiFilter: currentFilter});
        dispatch(fetchStudFilterValues(currentFilter, `${f}&inclv=2`));
      }
    }
  }

  handleFilterClick(item, apiFilter) {
    const id = item.Id ? item.Id : item;
    const {params, dispatch} = this.props;
    const {filters} = params;
    const index = STUD_FILTERS.indexOf(apiFilter);
    const cFilter = STUD_FILTERS[index + 1];
    const t = `${filters ? `${filters}&` : ''}${apiFilter}=${id}`;

    dispatch(pushPath(`/hub-selection/stud/filter/${cFilter}/${t}`));
  }

  renderButton(item) {
    if (_.isObject(item)) {
      if (item.Name) {
        return item.Name;
      }
      return null;
    } else {
      const num = parseFloat(item);
      return `⌀${num} inch [${Math.round(num * 24.5)} mm]`;
    }
  }


  render() {
    const {results: {isFetching, studFilterValue}} = this.props;
    const {apiFilter, skippedFilter} = this.state;

    if (isFetching) {
      return <Spinner isFetching />;
    }

    if (studFilterValue && studFilterValue.length) {
      let message = '';

      if (apiFilter === 'stldp') {
        message = 'Choose the Style Description';
      } else if (apiFilter === 'stdia') {
        message = 'Choose the Stud Diameter';
      } else if (apiFilter === 'thrdt') {
        message = 'Choose the Thread Orientation';
      } else if (apiFilter === 'dimA') {
        message = 'Choose the Dimension A';
      } else if (apiFilter === 'dimB') {
        message = 'Choose the Dimension B';
      } else if (apiFilter === 'dimC') {
        message = 'Choose the Dimension C';
      } else if (apiFilter === 'dimD') {
        message = 'Choose the Dimension D';
      }

      if (skippedFilter === 'sdnum' && studFilterValue[0].StudNumber) {
        return <StudResult result={studFilterValue} />;
      }

      return (
        <div className="grid-container main-content replacement-drum">
          <h1>{message}</h1>
          <div className="grid-block">
            {studFilterValue.map((item, index) => {
              return (
                <div className="grid-content small-12" key={`${apiFilter}${index}`}>
                  <div className="conmet-button">
                    <button className="yes-no-button bold" onClick={() => this.handleFilterClick(item, apiFilter)}>
                      {this.renderButton(item)}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      );
    }

    return (
      <div>Stud Filter</div>
    );
  }
}

export default connect()(StudFilter);
