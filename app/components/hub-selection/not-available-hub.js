import React, {PropTypes, Component} from 'react';
import {
    fetchHubAssemblyFiltersWithNoResults, fetchHubAssemblyNumber,
} from 'actions';

import {connect} from 'react-redux';
import Spinner from '../global/spinner';
import HubSingleResult from './details/result';


class NotAvailableHub extends Component {

  constructor(props) {
    super(props);
    this.state = {
      short_studs: null,
      results: [],
      isFetching: false,
      spindleNut: "",
    };
  }

    componentDidMount() {
        const { results, dispatch, routeParams } = this.props;
        if(!results.filters.Results){
            dispatch(fetchHubAssemblyNumber(routeParams.id)).then(() => {
                let chaid = this.props.results.assemblyNumber.Results[0].CompetitorHubAssemblyNumberId;
                dispatch(fetchHubAssemblyFiltersWithNoResults(chaid));
            });
        }
        if(results.filters.Results && results.filters.Results.length){
            this.setState({results: results.filters.Results});
        }
    }
    componentWillReceiveProps(newProps) {
        const { results } = newProps;
        if(results.filters.Results && results.filters.Results.length){
            this.setState({results: results.filters.Results});
        }
    }


  render() {
    let results = this.state.results;
    if (this.props.results.isSpindleNutFetching) {
      return (
        <Spinner isFetching={true}/>
      )
    }

   if (results.length > 0) {
      return (
        <div>
          {results.map((item, index) => {
            if (index === this.props.results.selectedIdx) {
              return (
                <HubSingleResult
                  key={index}
                  item={item}
                  spindleNut={this.state.spindleNut}
                  total={1}
                  selectedHubAssemblyNumber={this.props.results.selectedHubAssemblyNumber}
                  short_studs={this.props.results.short_studs}
                />
              )
            }
          })}
        </div>
      )
    } else {
      return (
        <Spinner isFetching={true}/>
      )
    }
  }
};

export default connect()(NotAvailableHub);
