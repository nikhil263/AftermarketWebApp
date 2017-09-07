import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection'
import {connect} from 'react-redux'
import {fetchHubAssemblyFilters, fetchHubAssemblyNumber, fetchFilterValues,fetchHubsCrossApi} from 'actions';
import { pushPath } from 'redux-simple-router'
import Autocomplete from 'react-autocomplete';

class Results extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            assemblyNumber: [],
            loading: false,
            filter_name: [],
            current_filter: null,
            url: ''
        };
    }

    doSearch(e){
        e.preventDefault();
        this.hubAssemblyFilters(this.state.assemblyNumber.CompetitorHubAssemblyNumberId);
    }

    hubAssemblyFilters(id){
        if(id){
            const { dispatch } = this.props;
            dispatch(fetchHubAssemblyFilters(id)).then(()=>{
                let filters = this.props.results.filters.Results;
                let categories = this.props.app.categories;
                let j = 0;

                Object.keys(categories).forEach((key)=>{
                    if(filters.hasOwnProperty(categories[key].QueryParameterName) === false && categories[key].QueryParameterName !== 'tmake'){
                        this.state.filter_name[j] = categories[key].QueryParameterName;
                        j++;
                    }
                });

                this.getFilterValues();
            });
        }
    }

    getFilterValues(id = null){
        const { dispatch } = this.props;
        let filters = this.props.results.filters.Results;

        if(this.state.url === ''){
            let i = 1, length = Object.keys(filters).length;
            Object.keys(filters).forEach((key)=>{
                this.state.url += (i === length) ? key+'='+filters[key] : key+'='+filters[key]+"&";
                i++;
            });
        }

        if(this.state.current_filter !== null && id !== null){
            this.state.url+= '&'+this.state.current_filter+'='+id;
            this.state.filter_name[this.state.current_filter] = id;
        }

        if(this.state.current_filter === 'hatyp' || this.state.filter_name[0] === undefined || (this.state.current_filter !== 'hatyp' && this.state.filter_name[0] === 'hatyp' && this.state.current_filter !== null)){
            this.hubCrossApi();
        }else{
            dispatch(fetchFilterValues(this.state.filter_name[0],this.state.url)).then(()=>{
                let results = this.props.results.filter_value.Results;
                this.setState({current_filter: this.state.filter_name[0]});
                this.state.filter_name.shift();
                if(results.length === 1){
                    this.getFilterValues(results[0].Id);
                }
            });
        }
    }

    hubCrossApi(){
        this.state.url += '&inclv=1';
        this.props.dispatch(fetchHubsCrossApi(this.state.url)).then(()=>{
            this.props.dispatch(pushPath('/hub-selection/search/'+this.props.results.item.Results[0].HubAssemblyNumber));
        });
    }

    handleFilterClick(e){
        e.preventDefault();
        let id = e.target.id;
        if(id){
            this.getFilterValues(e.target.id)
        }
    }

    render() {
        let current_filter = this.state.current_filter;
        let results = this.props.results.filter_value.Results;

        if(current_filter === 'gawrr') {
            return (
                <div className="grid-container main-content">
                    <h1>Choose the GAWR (Gross Axle Weight Rating)</h1>
                    <div className="grid-content">
                        {results.map((key) => {
                            return <div className="small-12">
                                <div className="conmet-button">
                                    <button className="yes-no-button bold" id={key.Id} key={key.Id} onClick={this.handleFilterClick.bind(this)}>
                                        {key.DisplayRange}
                                    </button>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            )
        }else if(current_filter === 'wmslc'){
            return (
                <div className="grid-container main-content">
                    <h1>Choose the wheel type (determine wheel stud length)</h1>
                    <div className="grid-content">
                        {results.map((key) => {
                            return <div className="small-12">
                                <div className="conmet-button">
                                    <button className="yes-no-button bold" id={key.Id} key={key.Id} onClick={this.handleFilterClick.bind(this)}>
                                        {key.WheelMaterial} - {key.StudLengthClass}
                                    </button>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            )
        }else if(current_filter === 'hcmty' || current_filter === 'hatyp'){
            return (
                <div className="grid-container main-content">
                    <h1>{current_filter === 'hcmty' ? 'Choose the wheel type (determine wheel stud length)' : 'Choose the hub assembly type'}</h1>
                    <div className="grid-content">
                        {results.map((key) => {
                            return <div className="small-12">
                                <div className="conmet-button">
                                    <button className="yes-no-button bold" id={key.Id} key={key.Id} onClick={this.handleFilterClick.bind(this)}>
                                        {key.Name}
                                    </button>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            )
        }else{
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
                        <button type="submit" className="button general-button" onClick={this.doSearch.bind(this)}>Continue</button>
                    </form>
                </div>
            )
        }
    }
};

export default connect()(Results)
