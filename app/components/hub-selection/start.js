import React, {PropTypes, Component} from 'react';
import {pushPath} from 'redux-simple-router';
import {connect} from 'react-redux';
import {
    unifiedSearch,
    fetchHubAssemblyFilters,
    fetchHubAssemblyFiltersWithNoResults, saveBrakeRotorNumber
} from 'actions';
import Autocomplete from 'react-autocomplete';

class Start extends Component {
    constructor(props) {
        super(props);
        this.doSearch = this.doSearch.bind(this);

        this.state = {
            value: '',
            partNumber: [],
            loading: false,
            url: '',
        };
    }
  static contextTypes = {
    store: PropTypes.object,
    history: PropTypes.object
  };

  handleClick(path) {
    const {dispatch} = this.props;
    dispatch(pushPath(path));
  }

    doSearch(e){
        e.preventDefault();
        this.hubAssemblyFilters(this.state.partNumber);
    }

    hubAssemblyFilters(data){
        if(data.PartTypeId === 115){
            this.getResult(data.CompetitorInterchangesId);
        }else if(data.PartTypeId === 5){
            this.props.dispatch(pushPath('/hub-selection/stud/filters/sdnum?inclv=1&sdnum='+data.CompetitorPartNumber));
        }else if(data.PartTypeId === 23){
            this.props.dispatch(pushPath('/hub-selection/replacement-drum/recommended-drums/'+data.CompetitorInterchangesId));
        }else if(data.PartTypeId === 203){
            this.props.dispatch(saveBrakeRotorNumber(data.CompetitorPartNumber));
            setTimeout(() => {
                this.props.dispatch(pushPath('/hub-selection/replacement-rotor/recommended-rotors/'+data.CompetitorInterchangesId));
            }, 100);
        }else{
            if(this.state.partNumber.length === 1){
                this.getResult(this.state.partNumber[0].CompetitorInterchangesId);
            }else if((this.state.value !== "") && (this.state.partNumber.length === 0) && !this.state.loading){
                this.props.dispatch(pushPath('/hub-selection/no-results'));
            }
        }
    }

    getResult(id){
        const { dispatch } = this.props;
        let url = '';
        dispatch(fetchHubAssemblyFilters(id)).then(()=>{
            let filters = this.props.results.filters.Results;
            let CompetitorPartNumber = this.state.partNumber[0].CompetitorPartNumber;
            if(filters === undefined){
                dispatch(fetchHubAssemblyFiltersWithNoResults(id)).then(()=>{
                    this.props.dispatch(pushPath('/hub-selection/not-available/' + CompetitorPartNumber))
                })
            }else{
                let i = 1, length = Object.keys(filters).length;

                Object.keys(filters).forEach((key)=>{
                    url += (i === length) ? key+'='+filters[key] : key+'='+filters[key]+"&";
                    i++;
                });
                this.props.dispatch(pushPath('/hub-selection/filters/'+url));
            }

        });
    }

  render() {
    return (
      <div className="grid-container main-content">
        <h2>What are you looking for?</h2>
          <form id="autoComplete">
              <Autocomplete
                  value={this.state.value}
                  inputProps={{ placeholder: 'Please enter a valid ConMet or Competitor part number',className: 'assembly-number', id:'assemblyNumber',type:'text' }}
                  wrapperStyle={{ position: 'relative',display: 'block', margin: '0 0 1rem 0' }}
                  items={this.state.partNumber}
                  getItemValue={(item) => item.CompetitorName+' '+item.CompetitorPartNumber}
                  onSelect={(value, state) => {
                      this.props.results.selectedHubAssemblyNumber = state.CompetitorName+' '+state.CompetitorPartNumber;
                      this.hubAssemblyFilters(state);
                      this.setState({ value, partNumber: [state] })
                  }}
                  onChange={(event, value) => {
                      this.setState({value, partNumber : [], loading: true });
                      if(value !== ''){
                          this.props.dispatch(unifiedSearch(value)).then(() => {
                              let results = this.props.results.partNumber.Results;
                              if(results){
                                  this.setState({ partNumber: this.props.results.partNumber.Results, loading: false });
                              }else{
                                  this.setState({ partNumber: [], loading: false });
                              }
                          });
                      }
                  }}
                  renderItem={(item, isHighlighted) =>
                      <div className="menu-item" style={{ background: isHighlighted ? 'lightgray' : 'white' }} key={item.CompetitorInterchangesId}>
                          {item.CompetitorName}  {item.CompetitorPartNumber}
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
              <div className="btn-no-description conmet-button">
                  <button type="submit" onClick={this.doSearch}><h2 style={{textAlign: 'center'}}>Continue</h2></button>
              </div>
          </form>
          <hr/>
        <div className="btn-no-description conmet-button">
          <button onClick={this.handleClick.bind(this, '/hub-selection/choose-path')} store={this.context.store}>
            <h2>HUBS <i className="icon-angle-right" /></h2>
          </button>
        </div>
        <div className="btn-no-description conmet-button">
          <button onClick={this.handleClick.bind(this, '/parts/choose-path')} store={this.context.store}>
            <h2>HUB COMPONENTS <i className="icon-angle-right" title="Right Arrow" /></h2>
          </button>
        </div>
        <div className="btn-no-description conmet-button">
          <button onClick={this.handleClick.bind(this, '/hub-selection/replacement-drum')} store={this.context.store}>
            <h2>BRAKE DRUMS <i className="icon-angle-right" /></h2>
          </button>
        </div>
        <div className="btn-no-description conmet-button">
          <button onClick={this.handleClick.bind(this, '/hub-selection/replacement-rotor')} store={this.context.store}>
            <h2>BRAKE ROTORS <i className="icon-angle-right" title="Right Arrow" /></h2>
          </button>
        </div>
        {/*<div className="btn-no-description conmet-button">*/}
          {/*<button onClick={this.handleClick.bind(this, '/hub-selection/stud/filter')} store={this.context.store}>*/}
            {/*<h2>STUD SEARCH <i className="icon-angle-right" title="Right Arrow" /></h2>*/}
          {/*</button>*/}
        {/*</div>*/}
        <p className="terms-and-conditions">In using this application you are acknowledging that you have read and understand ConMet's <a href='/ConMet-Terms-And-Conditions.pdf' target='_blank'>terms and conditions</a></p>
      </div>
    )
  }
}

export default connect()(Start)
