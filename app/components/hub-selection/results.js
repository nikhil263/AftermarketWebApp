import React, { PropTypes, Component } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux'
import Spinner from 'components/global/spinner'
import { MATERIAL_ALL, MATERIAL_ALUMINUM, MATERIAL_IRON} from 'config/constants'
import {materialFilter, fetchAssembly} from 'actions'
import _ from 'lodash'


import Result from './details/result'
import ResultNavigation from './details/result-navigation'

class NoResults extends Component {
	render(){
		return (
			<div className="grid-container main-content">
				<h1>Sorry. No results were found.</h1>
			</div>
		)
	}
}

class Waiting extends Component {
	render() {
		return (
			<div className="grid-container main-content">
				<h1>Receiving results</h1>
				<Spinner isFetching={true} />
			</div>
		)
	}
}

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
class ResetMaterial extends Component {
	resetMaterialFilter(filter) {
		const {dispatch} = this.props
		dispatch(materialFilter(filter))
	}

	render() {
		const {total, materialFilter} = this.props;
		let label = 'View Iron Hubs'
		let filter = MATERIAL_IRON
		if (materialFilter === MATERIAL_IRON) {
			label = 'View Aluminum Hubs'
			filter = MATERIAL_ALUMINUM
		}
		if (total < 2) {
			return (<div></div>)
		}
		return (
			<div className="conmet-button center">
			<button className="yes-no-button" onClick={this.resetMaterialFilter.bind(this, filter)}>
				<strong>{label}</strong>
			</button>
			</div>
		)
	}
}


const getFilteredResults = (results,filter) => {
	let filtered = {
		items: [],
		total: 0
	}
	switch (filter) {
		case MATERIAL_ALL:
			return results;
		case MATERIAL_ALUMINUM:
			filtered.items = _.filter(results.items, r => r.HubCastingMaterialType === 'Aluminum')
			filtered.total = filtered.items.length;
			return Object.assign({},results,filtered);
		case MATERIAL_IRON:
			filtered.items = _.filter(results.items, r => {
				return r.HubCastingMaterialType === 'Iron'
			})
			filtered.total = filtered.items.length;

			return Object.assign({},results,filtered);
	}
}

class Results extends Component {
	componentDidMount() {
		const {dispatch, app} = this.props
		dispatch(fetchAssembly(app))
	}

	render() {
		const { results, materialFilter, dispatch } = this.props

		const filteredResults = results

		if (filteredResults.isFetching) {
			return (<Waiting />)
		}
		if (filteredResults.items.length === 0) {
			return (<NoResults />)
		}
		if (materialFilter === MATERIAL_ALL && filteredResults.items.length > 1) {
			return <MaterialType dispatch={dispatch}/>
		}



		return (
			<div className="grid-container main-content">
				<h1>Success! The following ConMet PreSet hub(s) are recommended</h1>


					{filteredResults.items.map((item, index) => {
						if (index === filteredResults.selectedIdx) {
							return <Result idx={filteredResults.selectedIdx} total={filteredResults.total} key={index} item={item} />
						}
					})}

					<ResultNavigation total={filteredResults.total} currentIdx={filteredResults.selectedIdx}/>


				{/*



					<Link to="/hub-selection/details" className="general-button">See Details</Link>
					<div className="conmet-button">
				<Link to="/hub-selection/step-three" className="yes-no-button">Find this Product</Link>
				</div>*/}
			</div>
		)
	}
};
export default connect()(Results)
