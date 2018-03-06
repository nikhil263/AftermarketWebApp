import React, { PropTypes, Component } from 'react';
import { pushPath } from 'redux-simple-router';
import { connect } from 'react-redux';
import { fetchRotorFilterValues, fetchRotorFilterCategories, resetDrumFilter } from 'actions';
import Waiting from 'components/global/waiting';
import { IMAGE_CDN } from 'config/constants';
import RotorResult from './rotorResult';

class ReplacementRotorFilter extends Component {

    constructor(props) {
        super(props);
        this.getFilterValue = this.getFilterValue.bind(this);
        this.handleFilterClick = this.handleFilterClick.bind(this);

        this.state = {
            filters: [],
            urlParams: '',
            skipFilter: {},
            filterClicked: false,
        };
    }

    componentWillMount(){
        const { dispatch, results } = this.props;
        const { rotorFilters } = results;
        if (!rotorFilters.length) {
            dispatch(fetchRotorFilterCategories());
        }
        dispatch(resetDrumFilter());
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(resetDrumFilter());
    }

    componentDidMount() {
        this.getFilterValue();
    }

    componentDidUpdate() {
        this.getFilterValue();
    }

    handleFilterClick(id) {
        const { dispatch, results } = this.props;
        const { currentFilter } = results;
        const { filters, urlParams, skipFilter } = this.state;
        const index = currentFilter === 'bcdia' ? -1 : filters.indexOf(currentFilter);
        this.state.filterClicked = true;
        this.state.urlParams += urlParams === '' ? currentFilter+'='+id : '&'+currentFilter+'='+id;

        let url = this.state.urlParams;
        if (skipFilter !== undefined) {
            const skippedFilter = Object.keys(skipFilter);
            if (skippedFilter.length) {
                url += '&'+skippedFilter.map((key) => key+'='+skipFilter[key]).join('&');
            }
            this.state.skipFilter = [];
        }

        dispatch(pushPath('/hub-selection/replacement-rotor/filter/'+(filters.length === (index + 1) ? filters[0] : filters[index + 1])+'/'+url));
    }

    getFilterValue() {
        const { results, params, dispatch } = this.props;
        const { rotorFilters, rotorFilterValue } = results;
        const isResult = rotorFilterValue && rotorFilterValue[0] && rotorFilterValue[0].BrakeRotorNumber;
        const { filters, urlParams, currentFilter, skipFilter } = this.state;
        this.state.urlParams = params.filters ? params.filters : '';

        if (rotorFilters.length) {
            this.state.filters = rotorFilters.map((item) => item.QueryParameterName);
        }

        let filterParams = params.filters ? '?inclv=2&'+params.filters : '?inclv=2';
        this.state.url = filterParams;

        if (rotorFilters.length && !params.currentFilter) {
            dispatch(pushPath('/hub-selection/replacement-rotor/filter/'+this.state.filters[1]));
            this.state.skipFilter = []; // when back button is pressed
        } else if (params.currentFilter !== this.state.currentFilter) {
            dispatch(fetchRotorFilterValues(params.currentFilter, filterParams));
            this.state.currentFilter = params.currentFilter;
            this.state.filterClicked = false;
        } else if (rotorFilters.length && rotorFilterValue.length === 1 && !isResult && results.isFilterValueSingle) {
            const index = filters.indexOf(results.currentFilter);
            const id = rotorFilterValue[0].Id !== undefined ? rotorFilterValue[0].Id : rotorFilterValue[0];

            if (this.state.url === '') {
                this.state.url = filterParams;
            }

            if (filters.length === (index + 1)) {
                this.state.url += '&'+filters[0]+'='+id;
                dispatch(fetchRotorFilterValues(filters[0], this.state.url, false));
                this.state.skipFilter = [];
            } else {
                this.state.url += '&'+filters[index]+'='+id;
                if (this.state.filterClicked) {
                    this.state.skipFilter = {...skipFilter, [filters[index]]: id};
                }
                this.state.filterClicked = false;
                dispatch(fetchRotorFilterValues(filters[index + 1], this.state.url, false));
            }
        }
    }

    render() {
        const { results } = this.props;
        const { rotorFilterValue, currentFilter } = results;
        const isResult = rotorFilterValue && rotorFilterValue[0] && rotorFilterValue[0].BrakeRotorNumber;

        if (results.isFetching) {
            return (<Waiting />)
        }

        if (currentFilter === 'axpos' && (rotorFilterValue !== undefined)) {
            return (
                <div className="grid-container main-content replacement-drum">
                    <h1>Choose the Axle position</h1>
                    <div className="grid-content">
                        {rotorFilterValue.map((item) => {
                            return (
                                <div className="small-12" key={currentFilter+item.Id}>
                                    <div className="conmet-button">
                                        <button className="yes-no-button bold" onClick={() => this.handleFilterClick(item.Id)}>
                                            {item.Name}
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        }

        if (currentFilter === 'brtyp' && (rotorFilterValue !== undefined)) {
            return (
                <div className="grid-container main-content replacement-drum">
                    <h1>Choose the brake rotor type</h1>
                    <div className="grid-block">
                        {rotorFilterValue.map((item) => {
                            return (
                                <div className="grid-content small-6" key={currentFilter+item.Id}>
                                    <img className="product-image"  src={IMAGE_CDN+item.ImageGuid+'.png'} alt={item.Name} width="200" height="200" />
                                    <div className="conmet-button">
                                        <button className="yes-no-button bold" onClick={() => this.handleFilterClick(item.Id)}>
                                            {item.Name}
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        }

        if (currentFilter === 'bsdia' || currentFilter === 'ovlgt' && (rotorFilterValue !== undefined)) {
            let message = '';

            if (currentFilter === 'bsdia') {
                message = 'Choose the Brake Surface Outside Diameter';
            } else if (currentFilter === 'ovlgt') {
                message = 'Choose the overall length';
            }

            return (
                <div className="grid-container main-content replacement-drum">
                    <h1>{message}</h1>
                    <div className="grid-content">
                        {rotorFilterValue.map((item) => {
                            const value = (currentFilter === 'bsdia') ? '⌀'+item.toFixed(1)+' inch'+' ['+(item * 25.4).toFixed(0)+' mm]' : '⌀'+item.toFixed(1)+' inch';
                            return (
                                <div className="small-12" key={currentFilter+item}>
                                    <div className="conmet-button">
                                        <button className="yes-no-button bold" onClick={() => this.handleFilterClick(item)}>
                                            {value}
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        }

        if (isResult) {
            return (
                <RotorResult rotorResult={rotorFilterValue} />
            )
        }

        return (<div />)
    }
};

export default connect()(ReplacementRotorFilter);
