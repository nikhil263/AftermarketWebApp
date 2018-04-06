import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import { fetchRotorNumber, saveBrakeRotorNumber } from 'actions';
import { pushPath } from 'redux-simple-router';
import Autocomplete from 'react-autocomplete';

class ReplacementRotorSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            rotorNumber: [],
            loading: false,
            url: ''
        };
    }

    doSearch(e){
        e.preventDefault();
        if (this.state.rotorNumber.length === 1 && this.state.rotorNumber[0].CompetitorBrakeRotorId) {
            this.hubAssemblyFilters(this.state.rotorNumber[0]);
        }
    }

    hubAssemblyFilters(data){
        const { dispatch } = this.props;
        dispatch(saveBrakeRotorNumber(data.BrakeRotorNumber));
        setTimeout(() => {
            dispatch(pushPath('/hub-selection/replacement-rotor/recommended-rotors/'+data.CompetitorBrakeRotorId));
        }, 100);
    }

    render() {
        return (
            <div className="grid-container main-content">
                <h1>Enter your rotor number</h1>
                <form id="autoComplete">
                    <Autocomplete
                        value={this.state.value}
                        inputProps={{ placeholder: 'Please enter a valid ConMet or Competitor rotor number',className: 'assembly-number', id:'rotorNumber',type:'text' }}
                        wrapperStyle={{ position: 'relative',display: 'block', margin: '0 0 1rem 0' }}
                        items={this.state.rotorNumber}
                        getItemValue={(item) => item.Competitor+' '+item.BrakeRotorNumber}
                        onSelect={(value, state) => {
                            this.hubAssemblyFilters(state);
                        }}
                        onChange={(event, value) => {
                            this.setState({value, rotorNumber : [], loading: true });
                            if(value !== ''){
                                this.props.dispatch(fetchRotorNumber(value)).then(() => {
                                    let results = this.props.results.rotorNumber.Results;
                                    if(results){
                                        this.setState({ rotorNumber: this.props.results.rotorNumber.Results, loading: false });
                                    }else{
                                        this.setState({ rotorNumber: [], loading: false });
                                    }
                                });
                            }
                        }}
                        renderItem={(item, isHighlighted) =>
                            <div className="menu-item" style={{ background: isHighlighted ? 'lightgray' : 'white' }} key={item.CompetitorBrakeRotorId}>
                                {item.Competitor}  {item.BrakeRotorNumber}
                            </div>
                        }
                        renderMenu={(items, value) => (
                            <div className="menu">
                                {value === '' ? (
                                    <div className="item">Type ConMet or Competitor rotor number</div>
                                ) : this.state.loading ? (
                                    <div className="item">Loading...</div>
                                ) : items.length === 0 ? (
                                    <div className="item">No matches for {value}</div>
                                ) : items}
                            </div>
                        )}
                    />
                    <div className="help">Some examples: "Gunite", “ConMet 10041006”, "Durabrake 72201A”</div>
                    <button type="submit" className="button general-button" onClick={this.doSearch.bind(this)}>Continue</button>
                </form>
            </div>
        )
    }
};

export default connect()(ReplacementRotorSearch)
