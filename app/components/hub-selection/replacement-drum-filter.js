import React, { PropTypes, Component } from 'react';
import { pushPath } from 'redux-simple-router';
import { connect } from 'react-redux';
import { fetchDrumFilterValues, fetchDrumFilterCategories } from 'actions';
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
            cFilter: '',
        };
    }

    componentWillMount(){
        const { dispatch } = this.props;
        dispatch(fetchDrumFilterCategories());
    }

    componentDidMount() {
        this.getFilterValue();
    }

    getFilterValue() {
        const { results, params, dispatch } = this.props;
        const { drumFilters, drumFilterValue } = results;
        const { filters, urlParams, currentFilter } = this.state;

        this.state.urlParams = params.filters ? params.filters : '';

        if (drumFilters.length) {
            this.state.filters = drumFilters.map((item) => item.QueryParameterName);
        }

        let filterParams = params.filters ? '?inclv=2&'+params.filters : '?inclv=2';

        if (drumFilters.length && !params.currentFilter) {
            dispatch(pushPath('/hub-selection/replacement-drum/filter/'+this.state.filters[1]));
        } else if (params.currentFilter !== this.state.currentFilter) {
            dispatch(fetchDrumFilterValues(params.currentFilter, filterParams));
            this.state.currentFilter = params.currentFilter;

            if (currentFilter === 'bcdia') {
                dispatch(fetchDrumFilterValues(filters[0], filterParams));
            }
        } else if (drumFilterValue.length === 1) {
            // const index = filters.indexOf(currentFilter);
            // const cindex = filters.indexOf(this.state.cFilter);
            // const id = drumFilterValue[0].Id ? drumFilterValue[0].Id : drumFilterValue[0];
            // console.log(this.state.cFilter, filters[index + 1], filters[cindex + 1]);
            // if (this.state.cFilter !== filters[index + 1] && filters.length) {
            //     dispatch(fetchDrumFilterValues(filters[index + 1], filterParams+'&'+filters[index]+'='+id));
            // }
            // this.state.cFilter = filters[index + 1];
        }
    }

    handleFilterClick(id) {
        const { dispatch } = this.props;
        const { filters, currentFilter, urlParams } = this.state;
        const index = currentFilter === 'bcdia' ? -1 : filters.indexOf(currentFilter);

        this.state.urlParams += urlParams === '' ? currentFilter+'='+id : '&'+currentFilter+'='+id;
        dispatch(pushPath('/hub-selection/replacement-drum/filter/'+filters[index + 1]+'/'+this.state.urlParams));
    }

    componentDidUpdate() {
        this.getFilterValue();
    }

    render() {
        const { results } = this.props;
        const { drumFilterValue } = results;

        if (results.isFetching) {
            return (<Waiting />)
        }

        if (this.state.currentFilter === 'bcdia' || this.state.currentFilter === 'pidia' || this.state.currentFilter === 'holes' || this.state.currentFilter === 'shwid' || this.state.currentFilter === 'szdia') {
            let message = '';

            if (this.state.currentFilter === 'pidia') {
                message = 'Choose the pilot diameter system';
            } else if (this.state.currentFilter === 'bcdia') {
                message = 'Choose the bolt circle diameter';
            } else if (this.state.currentFilter === 'holes') {
                message = 'Choose the Stud Hole count';
            } else if (this.state.currentFilter === 'shwid') {
                message = 'Choose the shoe width';
            } else if (this.state.currentFilter === 'szdia') {
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

        if (this.state.currentFilter === 'tmake') {
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

        if (this.state.currentFilter === 'axpos') {
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
            <DrumResult drumResult={drumFilterValue} />
        )
    }
};

export default connect()(ReplacementDrumFilter);
