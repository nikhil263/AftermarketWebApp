import React, { PropTypes, Component } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux'
import Waiting from 'components/global/waiting'
import { MATERIAL_ALL, MATERIAL_ALUMINUM, MATERIAL_IRON} from 'config/constants'
import {fetchAssembly} from 'actions/assembly'
import {materialFilter, fetchHubs, fetchHubsSpindleNut} from 'actions'
import _ from 'lodash'
import NoResults from '../global/no-result'

// import Result from './details/result'
import Result from './details/hub-results';
import ResultNavigation from './details/result-navigation'



class MaterialType extends Component {
	setFilter(filter) {
		const {dispatch} = this.props;
		dispatch(materialFilter(filter))
	}
	setActive(filter) {
		const {materialFilter} = this.props;
		const baseClass = 'conmet-button'
		if (materialFilter === filter) {
			return baseClass + ' active';
		}
		return baseClass;
	}
	render() {

		return (
			<div className="grid-container main-content">
				<h1>Choose the Hub Material</h1>

				<div className={this.setActive(MATERIAL_IRON)}>
					<button className="yes-no-button" onClick={this.setFilter.bind(this, MATERIAL_IRON)}><strong>Iron</strong>
					</button>
				</div>

				<div className={this.setActive(MATERIAL_ALUMINUM)}>
				<button className="yes-no-button" onClick={this.setFilter.bind(this, MATERIAL_ALUMINUM)}><strong>Aluminum</strong>
				</button>
				</div>
			</div>
		)

	}
}

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	results: [],
        	newResults: [],
            spindleNut: ""
        };
    }

	componentDidMount() {
		const {dispatch, app, params} = this.props;
		if (params.id) {
			dispatch(fetchHubs(params.id))
		} else {
			dispatch(fetchAssembly(app))
		}

	}

    componentWillReceiveProps(newProps){
    	const {results,dispatch} = newProps;
    	this.state.newResults = results;
        if(!results.isFetching && !(results.items.length === 0) && results.items[0] && ((this.state.results.items === undefined) || (results.items[0].PartNumber !== this.state.results.items[0].PartNumber))){
            this.setState({results: results});
            let partNumber = "";
            results.items.map((item,id)=>{
                partNumber += (id + 1 === results.items.length) ? item.HubAssemblyNumber : item.HubAssemblyNumber+",";
            });
            if(partNumber){
                dispatch(fetchHubsSpindleNut(partNumber)).then(()=>{
                    let spindleNut = "";
                    if(this.state.newResults.spindleNut !== undefined){
                        this.state.newResults.spindleNut[0].AftermarketParts.map((item, id)=>{
                            spindleNut += (id + 1 === this.state.newResults.spindleNut[0].AftermarketParts.length ? item.PartNumber : item.PartNumber+",");
                        });
                        this.setState({spindleNut: spindleNut});
                    }
                });
            }
        }
    }

	render() {
		const { results, materialFilter, dispatch } = this.props;

		if (results.isFetching) {
			return (<Waiting />)
		}
		if (results.items.length === 0) {
			return (<NoResults />)
		}
		if (materialFilter === MATERIAL_ALL && results.items.length > 1) {
			return <MaterialType dispatch={dispatch}/>
		}

        return (
        	<Result results={results.items} spindleNut={this.state.spindleNut} selectedHubAssemblyNumber={null} />
		)
	}
};
export default connect()(Results)
