import React, {Component} from 'react';
import {connect} from 'react-redux';
import {pushPath} from 'redux-simple-router';
import _ from 'lodash';
import {IMAGE_CDN, STUD_FILTERS} from "config/constants";
import {fetchStudFilterValues} from "actions";
import Spinner from 'components/global/spinner';
import StudResult from './studResult';

class StudFilter extends Component {
  constructor(props) {
    super(props);

    this.getValue = this.getValue.bind(this);
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

  isNil(value) {
    return value !== null && value !== undefined;
  }

  getValue(item) {
    if (this.isNil(item.Id)) {
      return item.Id;
    } else if (this.isNil(item.Inch)) {
      return item.Inch;
    } else if (this.isNil(item.Inches)) {
      return item.Inches;
    }

    return item;
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
      const id = this.getValue(item);

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
    const id = this.getValue(item);
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
      if (item.Inches) {
        return this.getFormattedLabel(item.Inches);
      }
      return item.lable;
    } else {
      return this.getFormattedLabel(item);
    }
  }

  getFormattedLabel(item) {
    const num = parseFloat(item);
    return `⌀ ${num} inch [${Math.round(num * 24.5)} mm]`;
  }

  render() {
    const {results: {isFetching, studFilterValue}} = this.props;
    const {apiFilter, skippedFilter} = this.state;

    if (isFetching) {
      return <Spinner isFetching/>;
    }

    if (studFilterValue && studFilterValue.length) {
      let message = '';
      let image = '';

      if (apiFilter === 'stldp') {
        message = 'Choose the Style Description';
      } else if (apiFilter === 'stdia') {
        message = 'Choose the Stud Diameter';
      } else if (apiFilter === 'thrdt') {
        message = 'Choose the Thread Orientation';
      } else if (apiFilter.includes('dim')) {
        const t = apiFilter.split('dim')[1];
        message = `Choose the Dimension ${t}`;

        for (let i = 0; i < studFilterValue.length; i += 1) {
          const item = studFilterValue[i];
          if (item.Images && item.Images.length) {
            image = item.Images[0].ImageGuid;
            break;
          }
        }
      }

      if (skippedFilter === 'sdnum' && studFilterValue[0].StudNumber) {
        return <StudResult result={studFilterValue}/>;
      }

      return (
        <div className="grid-container main-content replacement-drum">
          <h1>{message}</h1>
          <div className="grid-block">
            {image && (
              <div className="grid-content small-12">
                <img className="product-image" src={IMAGE_CDN + image + '.png'} alt="Dimensions" height={400}
                     width={400}/>
              </div>
            )}

            {studFilterValue.map((item, index) => {
              return (
                <div className="grid-content small-6" key={`${apiFilter}${index}`}>
                  {item.Images && item.Images.length && !image && (
                    <img className="product-image stud-image" src={IMAGE_CDN + item.Images[0].ImageGuid + '.png'}
                         alt={item.Name}/>
                  )}
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
