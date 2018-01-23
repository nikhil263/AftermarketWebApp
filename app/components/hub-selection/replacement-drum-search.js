import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import {fetchHubAssemblyFilters, fetchDrumNumber} from 'actions';
import { pushPath } from 'redux-simple-router';
import Autocomplete from 'react-autocomplete';

class ReplacementDrumSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            drumNumber: [],
            loading: false,
            url: ''
        };
    }

    doSearch(e){
        e.preventDefault();
        this.hubAssemblyFilters(this.state.drumNumber.CompetitorDrumNumberId);
    }

    hubAssemblyFilters(id){
        this.props.dispatch(pushPath('/hub-selection/replacement-drum/recommended-drums/'+id));
    }

    render() {
        console.log(this.props.results.drumNumber.Results);
        return (
            <div className="grid-container main-content">
                <h1>Enter your drum number</h1>
                <form id="autoComplete">
                    <Autocomplete
                        value={this.state.value}
                        inputProps={{ placeholder: 'Please enter a valid ConMet or Competitor drum number',className: 'assembly-number', id:'drumNumber',type:'text' }}
                        wrapperStyle={{ position: 'relative',display: 'block', margin: '0 0 1rem 0' }}
                        items={this.state.drumNumber}
                        getItemValue={(item) => item.Competitor+' '+item.BrakeDrumNumber}
                        onSelect={(value, state) => {
                            this.hubAssemblyFilters(state.CompetitorDrumNumberId);
                            this.setState({ value, drumNumber: [state] })
                        }}
                        onChange={(event, value) => {
                            this.setState({value, drumNumber : [], loading: true });
                            if(value !== ''){
                                this.props.dispatch(fetchDrumNumber(value)).then(() => {
                                    let results = this.props.results.drumNumber.Results;
                                    if(results){
                                        this.setState({ drumNumber: this.props.results.drumNumber.Results, loading: false });
                                    }else{
                                        this.setState({ drumNumber: [], loading: false });
                                    }
                                });
                            }
                        }}
                        renderItem={(item, isHighlighted) =>
                            <div className="menu-item" style={{ background: isHighlighted ? 'lightgray' : 'white' }} key={item.CompetitorDrumNumberId}>
                                {item.Competitor}  {item.BrakeDrumNumber}
                            </div>
                        }
                        renderMenu={(items, value) => (
                            <div className="menu">
                                {value === '' ? (
                                    <div className="item">Type ConMet or Competitor drum number</div>
                                ) : this.state.loading ? (
                                    <div className="item">Loading...</div>
                                ) : items.length === 0 ? (
                                    <div className="item">No matches for {value}</div>
                                ) : items}
                            </div>
                        )}
                    />
                    <div className="help">Some examples: "10009830", “ConMet 10001776”, “Gunite 3141B”</div>
                    <button type="submit" className="button general-button" onClick={this.doSearch.bind(this)}>Continue</button>
                </form>
            </div>
        )
    }
};

export default connect()(ReplacementDrumSearch)
