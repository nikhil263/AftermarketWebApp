import React, { PropTypes, Component } from 'react';
import { pushPath } from 'redux-simple-router';
import { connect } from 'react-redux';
import { fetchDrumFilterValues, fetchDrumFilterCategories, resetDrumFilter } from 'actions';
import Waiting from 'components/global/waiting';
import DrumResult from './drumResult';

class ReplacementDrumFilter extends Component {

    constructor(props) {
        super(props);
        this.getFilterValue = this.getFilterValue.bind(this);
        this.handleFilterClick = this.handleFilterClick.bind(this);

        this.state = {
            filters: [],
            urlParams: '',
            isResult: false,
            skipFilter: {},
        };
    }

    componentWillMount(){
        const { dispatch } = this.props;
        dispatch(fetchDrumFilterCategories());
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(resetDrumFilter());
    }

    componentDidMount() {
        this.getFilterValue();
    }

    getFilterValue() {
        const { results, params, dispatch } = this.props;
        const { drumFilters, drumFilterValue } = results;
        const { filters, urlParams, currentFilter, isResult, skipFilter } = this.state;

        this.state.urlParams = params.filters ? params.filters : '';

        if (drumFilters.length) {
            this.state.filters = drumFilters.map((item) => item.QueryParameterName);
        }

        let filterParams = params.filters ? '?inclv=2&'+params.filters : '?inclv=2';
        this.state.url = filterParams;

        if (drumFilters.length && !params.currentFilter) {
            dispatch(pushPath('/hub-selection/replacement-drum/filter/'+this.state.filters[1]));
        } else if (params.currentFilter !== this.state.currentFilter) {
            if (results.currentFilter !== 'brnum' || !isResult) {
                let url = filterParams;

                if (skipFilter !== undefined) {
                    const skippedFilter = Object.keys(skipFilter);
                    if (skippedFilter.length) {
                        url += '&'+skippedFilter.map((key) => key+'='+skipFilter[key]).join('&');
                    }
                }

                dispatch(fetchDrumFilterValues(params.currentFilter, url));
                this.state.currentFilter = params.currentFilter;
            }

            if (results.currentFilter === 'brnum' && isResult && drumFilterValue && drumFilterValue[0] && drumFilterValue[0].BrakeDrumNumber) {
                this.state.isResult = false;
            }

            if (currentFilter === 'bcdia') {
                dispatch(fetchDrumFilterValues(filters[0], filterParams));
            }
        } else if (drumFilterValue.length === 1 && results.isFilterValueSingle && currentFilter && drumFilters.length) {
            const index = filters.indexOf(results.currentFilter);
            const id = drumFilterValue[0].Id !== undefined ? drumFilterValue[0].Id : drumFilterValue[0];

            if (this.state.url === '') {
                this.state.url = filterParams;
            }
            if (results.currentFilter === 'bcdia') {
                this.state.url += '&'+filters[0]+'='+id;
                dispatch(fetchDrumFilterValues(filters[0], this.state.url));
                this.state.currentFilter = 'brnum';
                this.state.isResult = true;
            } else {
                this.state.url += '&'+filters[index]+'='+id;
                this.state.skipFilter = {...skipFilter, [filters[index]]: id};
                dispatch(fetchDrumFilterValues(filters[index + 1], this.state.url, false));
            }
        }
    }

    handleFilterClick(id) {
        const { dispatch, results } = this.props;
        const { currentFilter } = results;
        const { filters, urlParams } = this.state;
        const index = currentFilter === 'bcdia' ? -1 : filters.indexOf(currentFilter);

        this.state.urlParams += urlParams === '' ? currentFilter+'='+id : '&'+currentFilter+'='+id;
        dispatch(pushPath('/hub-selection/replacement-drum/filter/'+filters[index + 1]+'/'+this.state.urlParams));
    }

    componentDidUpdate() {
        this.getFilterValue();
    }

    render() {
        const { results } = this.props;
        const { drumFilterValue, currentFilter } = results;
        const isResult = drumFilterValue && drumFilterValue[0] && drumFilterValue[0].BrakeDrumNumber;

        if (results.isFetching) {
            return (<Waiting />)
        }

        if (currentFilter === 'bcdia' || currentFilter === 'pidia' || currentFilter === 'holes' || currentFilter === 'shwid' || currentFilter === 'szdia' && currentFilter !== 'brnum' && !isResult) {
            let message = '';

            if (currentFilter === 'pidia') {
                message = 'Choose the pilot diameter system';
            } else if (currentFilter === 'bcdia') {
                message = 'Choose the bolt circle diameter';
            } else if (currentFilter === 'holes') {
                message = 'Choose the Stud Hole count';
            } else if (currentFilter === 'shwid') {
                message = 'Choose the shoe width';
            } else if (currentFilter === 'szdia') {
                message = 'Choose the brake diameter';
            }

            return (
                <div className="grid-container main-content replacement-drum">
                    <h1>{message}</h1>
                    <div className="grid-content">
                        {drumFilterValue.map((item) => {
                            return (
                                <div className="small-12" key={item}>
                                    <div className="conmet-button">
                                        <button className="yes-no-button bold" onClick={() => this.handleFilterClick(item)}>
                                            {item}
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        }

        if (currentFilter === 'tmake' && !isResult) {
            return (
                <div className="grid-container main-content replacement-drum">
                    <h1>Choose the truck make</h1>
                    <div className="grid-content">
                        {drumFilterValue.map((item) => {
                            return (
                                <div className="small-12" key={item.Id}>
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

        if (currentFilter === 'axpos' && !isResult) {
            return (
                <div className="grid-container main-content replacement-drum">
                    <h1>Choose the tractor axle position</h1>
                    <div className="grid-content">
                        {drumFilterValue.map((item) => {
                            return (
                                <div className="small-12" key={item.Id}>
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

        return (
            <div>
                {
                    isResult ? <DrumResult drumResult={drumFilterValue} /> : <div />
                }
            </div>
        )
    }
};

export default connect()(ReplacementDrumFilter);
