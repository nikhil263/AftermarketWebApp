import React, { PropTypes, Component } from 'react';
import {fetchFilterValues,fetchHubsCrossApi,fetchHubsSpindleNut} from 'actions';
import {fetchCategories} from 'actions/categories';
import { pushPath } from 'redux-simple-router';
import { connect } from 'react-redux';
import Spinner from '../global/spinner';
import { IMAGE_CDN } from 'config/constants';
import {Link} from 'react-router';
import Result from './details/hub-results';
import ResultNavigation from './details/result-navigation';

class HubResults extends React.Component {
    render() {
        let assemblyType = this.props.assemblyType;
        if(assemblyType){
            return (
                <div className="details">
                    <div>Best Value:</div>
                    <ul>
                        <li>Extended Warranty</li>
                        <li>Less DownTime</li>
                        <li>Simplified Process</li>
                        <li>Liability Protection</li>
                    </ul>
                </div>
            )
        }else{
            return (
                <div className="details">
                    <div>Not Included:</div>
                    <ul>
                        <li>Bearing Cones</li>
                        <li>Seal</li>
                        <li>Manually Adjusted</li>
                    </ul>
                </div>
            )
        }
    }
}

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

    componentWillMount(){
        let filters = this.props.params.filters;
        this.props.dispatch(fetchCategories()).then(()=>{
            if(filters){
                this.setFilters(filters);
            }
        });
    }

    componentWillReceiveProps(newProps){
        if(this.state.url && this.state.url !== newProps.params.filters){
            this.setFilters(newProps.params.filters);
        }
    }

    setFilters(filters){
        let result = {};
        filters.split('&').forEach(function(x){
            let arr = x.split('=');
            arr[1] && (result[arr[0]] = arr[1]);
        });
        this.state.filters = result;
        this.state.url = filters;

        let categories = this.props.app.categories;
        let j = 0;

        Object.keys(categories).forEach((key)=>{
            if(result.hasOwnProperty(categories[key].QueryParameterName) === false && categories[key].QueryParameterName !== 'tmake' && categories[key].QueryParameterName !== 'gawrr'){
                this.state.filter_name[j] = categories[key].QueryParameterName;
                j++;
            }
        });

        this.getFilterValues();
    }

    getFilterValues(){
        const { dispatch } = this.props;

        if(this.state.current_filter === 'hatyp' || this.state.filter_name[0] === undefined || this.state.filter_name[0] === 'hatyp'){
            this.hubCrossApi();
        }else{
            dispatch(fetchFilterValues(this.state.filter_name[0],this.state.url)).then(()=>{
                let results = this.props.results.filter_value.Results;
                this.setState({current_filter: this.state.filter_name[0], isFetching: false, results: []});
                this.state.filter_name.shift();

                // if(this.state.current_filter === 'gawrr'){
                //     if(results.CanSkipThisFilter !== undefined && results.CanSkipThisFilter){
                //         this.state.filter_name[this.state.current_filter] = 0;
                //         this.getFilterValues();
                //     }
                // }

                if(results.length === 1){
                    this.state.filter_name[this.state.current_filter] = results[0].Id;
                    this.getFilterValues();
                }
            });
        }
    }

    handleFilterClick(e){
        e.preventDefault();
        this.state.isFetching = true;
        let id = e.target.id;
        if(id){
            let url = this.state.url;
            url+= '&'+this.state.current_filter+'='+id;
            this.props.dispatch(pushPath('/hub-selection/filters/'+url));
        }
    }

    hubCrossApi(){
        let url = this.state.url;
        url+='&inclv=1';
        let _self = this;
        this.props.dispatch(fetchHubsCrossApi(url)).then(()=>{
            _self.setState({results: _self.props.results.items.Results});
            let partNumber = "";
            _self.state.results.map((item,id)=>{
                partNumber += (id + 1 === _self.state.results.length) ? item.HubAssemblyNumber : item.HubAssemblyNumber+",";
            });

            _self.props.dispatch(fetchHubsSpindleNut(partNumber)).then(()=>{
                let spindleNut = "";
                if(_self.props.results.spindleNut !== undefined){
                    _self.props.results.spindleNut[0].AftermarketParts.map((item, id)=>{
                        spindleNut += (id + 1 === _self.props.results.spindleNut[0].AftermarketParts.length ? item.PartNumber : item.PartNumber+",");
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

        if(current_filter === 'gawrr' && filter_value[0] && filter_value[0].Id && !isFetching && !(results.length > 0)) {
            return (
                <div className="grid-container main-content">
                    <h1>Choose the GAWR (Gross Axle Weight Rating)</h1>
                    <div className="grid-content">
                        {filter_value.map((key) => {
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
        }else if(current_filter === 'wmslc' && !isFetching && !(results.length > 0)){
            return (
                <div className="grid-container main-content">
                    <h1>Choose the wheel type (determine wheel stud length)</h1>
                    <div className="grid-content">
                        {filter_value.map((key) => {
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
        }else if((current_filter === 'hcmty' || current_filter === 'hatyp') && !isFetching && !(results.length > 0)){
            return (
                <div className="grid-container main-content">
                    <h1>{current_filter === 'hcmty' ? 'Choose the hub material' : 'Choose the hub assembly type'}</h1>
                    <div className="grid-content">
                        {filter_value.map((key) => {
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
        }else if(results.length > 0) {
            return(
                <div className="grid-container main-content">
                    <h1>Success! The following ConMet hubs are recommended</h1>
                    {/*<div className="grid-content">*/}
                        {/*{this.state.results.map((item,index) => {*/}
                            {/*let assemblyType = item.AftermarketDescription.toLowerCase().includes('preset');*/}
                            {/*return <div className={results.length === 2 ? "small-6" : "small-12"}>*/}
                                {/*<img className="product-image"  src={IMAGE_CDN+item.Images[0].ImageGuid+'.png'} alt={item.HubAssemblyNumber} />*/}
                                {/*<div className="type">{assemblyType ? "PreSet" : "Conventional"}</div>*/}
                                {/*<div className="number">#{item.HubAssemblyNumber}</div>*/}
                                {/*<HubResults assemblyType={assemblyType} key={index} />*/}
                            {/*</div>*/}
                        {/*})}*/}

                        {/*{this.state.spindleNut ? <div className="optional-spindle">*/}
                            {/*Optional Spindle nut: {this.state.spindleNut}*/}
                        {/*</div> : ""}*/}
                        {/*{this.state.results.map((item,index) => {*/}
                            {/*return <div className={results.length === 2 ? "small-6" : "small-12"}>*/}
                                {/*<Link to={'/hub-selection/details/'+item.HubAssemblyNumber} key={index} className="general-button">See Details</Link>*/}
                            {/*</div>*/}
                        {/*})}*/}
                        {/*<div className="clearfix" />*/}
                    {/*</div>*/}
                    {/*<div className="disclaimer">ConMet Wheel End Disclaimer</div>*/}
                    {/*<div className="note">*/}
                        {/*{results[0].GawrNote.Text}*/}
                    {/*</div>*/}

                    <p className="text-center">{this.props.results.selectedHubAssemblyNumber !== '' ? 'for '+this.props.results.selectedHubAssemblyNumber : '' }</p>
                    {this.props.results.items.Results.map((item, index) => {
                        if (index === this.props.results.selectedIdx) {
                            return <Result idx={this.props.results.selectedIdx} total={this.props.results.total} key={index} item={item} />
                        }
                    })}

                    <ResultNavigation total={this.props.results.total} currentIdx={this.props.results.selectedIdx}/>
                </div>
            )
        }else{
            return (
                <Spinner isFetching={true} />
            )
        }
    }
};

export default connect()(Filters);
