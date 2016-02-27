import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import Step from 'components/hub-selection/step'
import {fetchCategories} from 'actions/categories'
import { setActiveFilterValue, checkFilterStatus, nextFilter, previousFilter } from 'actions/filters'

import { updateFilters,
				fetchAssembly,
				fetchHubs,
				updateStep,
			 	incrementStep,
				decrementStep} from 'actions'

class HubSelector extends Component {



	render() {
		const { dispatch, history, hub, truckMakes, results, app, materialFilter} = this.props;

		const childProps = {
			app: app,
			hub: hub,
			truckMakes: truckMakes,
			results: results,
			materialFilter, materialFilter,
			setFilter: (filterId, id, url) => {
				dispatch(setActiveFilterValue(filterId, id))
				dispatch(nextFilter(url))
			},
			setActive: (filterId, selected, baseClass = 'conmet-button') => {
				if (app.filterState[filterId] === selected) {
				    return baseClass + ' active';
				}
				return baseClass;
			},
			goBack: (app) => {
				dispatch(previousFilter(app))
			},
			searchForAssembly: (partNumber) => {
				if (partNumber) {
					dispatch(fetchHubs(partNumber))
				} else {
					dispatch(fetchAssembly(hub))
				}
			}
		}


		const childrenWithProps = React.Children.map(this.props.children,
					function(child) {
						return React.cloneElement(child, childProps);
	        });
		const backClick = childProps.goBack.bind(this, app);
		return (

			<div className="grid-block vertical align-center">

				<Step history={history} dispatch={dispatch} app={app} onClick={backClick}></Step>
				<div className="grid-content">
					<div className="grid-container main-content">
					{childrenWithProps}
					</div>
				</div>
			</div>
		)
	}
};

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
  return {
		app: state.appState,
    hub: state.hubSelector,
		truckMakes: state.truckMakes,
		results: state.results,
		materialFilter: state.materialFilter
	}
}
export default connect(select)(HubSelector)
