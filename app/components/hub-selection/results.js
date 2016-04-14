import React, { PropTypes, Component } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux'
import Spinner from 'components/global/spinner'
import { MATERIAL_ALL, MATERIAL_ALUMINUM, MATERIAL_IRON} from 'config/constants'
import {fetchAssembly} from 'actions/assembly'
import {materialFilter, fetchHubs} from 'actions'
import _ from 'lodash'


import Result from './details/result'
import ResultNavigation from './details/result-navigation'

class NoResults extends Component {
	render(){
		return (
			<div className="grid-container main-content">
				<h1>Sorry. No results were found.</h1>
				<div className="not-found">
				<p>
					This app is not all inclusive. The part number you entered is not referenced in this database,
					please verify that you’ve entered the correct assembly number. If you get the same result,
					please click on the link below to access our more extensive engineering hub catalog or
					call <a href="tel://1-800-547-9473">1-800-547-9473</a> and speak directly to one of our customer service professionals to identify
					the replacement hub part  number (service part) you need.
				</p>


				</div>

				<Link to={'https://vdm.conmet.com/HubCatalog/'} className="general-button">ConMet Online Parts Catalog</Link>

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

class Results extends Component {
	componentDidMount() {
		const {dispatch, app, params} = this.props
		// console.log(params)
		if (params.id) {
			dispatch(fetchHubs(params.id))
		} else {
			dispatch(fetchAssembly(app))
		}

	}

	render() {
		const { results, materialFilter, dispatch, images, app } = this.props

		const filteredResults = results

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
			<div className="grid-container main-content">
				{results.items.map((item, index) => {
					if (index === 0) {


					var title = ''
					if (results.items.length > 1) {
						title = 'Success! The following ConMet hubs are recommended'
					} else if (_.isUndefined(app.lastChoice.Name)) {
						title = 'Success! The following ConMet hub is recommended'
					} else {
						title = 'Success! The following ConMet '+app.lastChoice.Name+' hub is recommended'
					}
					return <h1>{title}</h1>
					}
				})}

					{results.items.map((item, index) => {
						if (index === results.selectedIdx) {
							return <Result idx={results.selectedIdx} total={results.total} key={index} item={item} images={images} />
						}
					})}

					<ResultNavigation total={results.total} currentIdx={results.selectedIdx}/>



			</div>
		)
	}
};
export default connect()(Results)
