import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchStudFilterValues} from "actions";
import Spinner from 'components/global/spinner';
import StudResult from './studResult';

class StudFilters extends Component {
  constructor(props) {
    super(props);
      this.state = {
          cFilter: '',
      };
    this.getFilterValue = this.getFilterValue.bind(this);
  }

  componentWillMount() {
    this.getFilterValue(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.getFilterValue(newProps);
  }


  getFilterValue(props) {
    const {params, dispatch, location, results: {isFetching}} = props;
    const {currentFilter, filters} = params;
      const {cFilter} = this.state;
    if(currentFilter === 'sdnum' && !isFetching && cFilter !== currentFilter){
        dispatch(fetchStudFilterValues(currentFilter, `${filters ? `${filters}&` : ''}inclv=1&${currentFilter}=${location.query.sdnum}`));
        this.setState({cFilter: currentFilter});
    }
  }

  render() {
    const {results: {isFetching, studFilterValue}} = this.props;

    if (isFetching) {
      return <Spinner isFetching/>;
    }

    if (studFilterValue && studFilterValue.length) {
        return <StudResult result={studFilterValue}/>;
    }
    return (
      <div>Stud Filter</div>
    );
  }
}

export default connect()(StudFilters);
