import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import {fetchHubAssemblyFilters, fetchHubAssemblyNumber} from 'actions';
import { pushPath } from 'redux-simple-router';
import Autocomplete from 'react-autocomplete';

class Results extends Component {
  constructor(props) {
    super(props);
    this.doSearch = this.doSearch.bind(this);
    this.state = {
      value: '',
      assemblyNumber: [],
      loading: false,
      url: ''
    };
  }

  doSearch(e){
    e.preventDefault();
    this.hubAssemblyFilters(this.state.assemblyNumber.CompetitorHubAssemblyNumberId);
  }

  hubAssemblyFilters(id){
    if(id){
      this.getResult(id);
    }else{
      if(this.state.assemblyNumber.length === 1){
        this.getResult(this.state.assemblyNumber[0].CompetitorHubAssemblyNumberId);
      }else if((this.state.value !== "") && (this.state.assemblyNumber.length === 0) && !this.state.loading){
        this.props.dispatch(pushPath('/hub-selection/no-results'));
      }
    }
  }

  getResult(id){
    const { dispatch } = this.props;
    let url = '';
    dispatch(fetchHubAssemblyFilters(id)).then(()=>{
      let filters = this.props.results.filters.Results;
      let i = 1, length = Object.keys(filters).length;

      Object.keys(filters).forEach((key)=>{
        url += (i === length) ? key+'='+filters[key] : key+'='+filters[key]+"&";
        i++;
      });

      this.props.dispatch(pushPath('/hub-selection/filters/'+url));
    });
  }

  render() {
    return (
      <div className="grid-container main-content">
        <h1>Enter your hub assembly number</h1>
        <form id="autoComplete">
          <Autocomplete
            value={this.state.value}
            inputProps={{ placeholder: 'Please enter a valid ConMet or Competitor assembly number',className: 'assembly-number', id:'assemblyNumber',type:'text' }}
            wrapperStyle={{ position: 'relative',display: 'block', margin: '0 0 1rem 0' }}
            items={this.state.assemblyNumber}
            getItemValue={(item) => item.Competitor+' '+item.HubAssemblyNumber}
            onSelect={(value, state) => {
              this.props.results.selectedHubAssemblyNumber = state.Competitor+' '+state.HubAssemblyNumber;
              this.hubAssemblyFilters(state.CompetitorHubAssemblyNumberId);
              this.setState({ value, assemblyNumber: [state] })
            }}
            onChange={(event, value) => {
              this.setState({value, assemblyNumber : [], loading: true });
              if(value !== ''){
                this.props.dispatch(fetchHubAssemblyNumber(value)).then(() => {
                  let results = this.props.results.assemblyNumber.Results;
                  if(results){
                    this.setState({ assemblyNumber: this.props.results.assemblyNumber.Results, loading: false });
                  }else{
                    this.setState({ assemblyNumber: [], loading: false });
                  }
                });
              }
            }}
            renderItem={(item, isHighlighted) =>
              <div className="menu-item" style={{ background: isHighlighted ? 'lightgray' : 'white' }} key={item.CompetitorHubAssemblyNumberId}>
                {item.Competitor}  {item.HubAssemblyNumber}
              </div>
            }
            renderMenu={(items, value) => (
              <div className="menu">
                {value === '' ? (
                  <div className="item">Type ConMet or Competitor assembly number</div>
                ) : this.state.loading ? (
                  <div className="item">Loading...</div>
                ) : items.length === 0 ? (
                  <div className="item">No matches for {value}</div>
                ) : items}
              </div>
            )}
          />
          <div className="help">Some examples: “104444”, “ConMet 10031065”, “Gunite 5669‑1”, “Webb 20231‑‑1T‑71”</div>
          <button type="submit" className="button general-button" onClick={this.doSearch}>Continue</button>
        </form>
      </div>
    )
  }
}

export default connect()(Results)
