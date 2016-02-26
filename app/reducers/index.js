import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import * as constants from '../config/constants'
import _ from 'lodash'

export function truckMake(state = {}, action) {
	switch(action.type) {
		case constants.SET_TRUCK_MAKE:
			if (state.id !== action.id) {
        return {
					...state,
					active: false
				}
      }
			return {
        ...state,
        active: true
      };
		default:
			return state;
	}
}

export function truckMakes(state = constants.TRUCKMAKES, action) {
	switch(action.type) {
		case constants.SET_TRUCK_MAKE:
			return state.map(t => truckMake(t, action));
		default:
			return state;
	}

}

export function hubSelector(state = constants.FILTERSTATE, action) {
	switch(action.type) {
		case constants.UPDATE_FILTER:
			return Object.assign({}, state, action.update);
		case constants.RESET_FILTER:
			return constants.FILTERSTATE;
		default:
			return state;
	}
}


const mergeInDetails = (assemblies = []) => {

	return assemblies.map(assembly => {
		var itemDetails = _.find(constants.AFTERMARKET_DETAILS, detail => {
			return assembly.PartNumber === detail.id.toString();
		})
		if (!itemDetails) {
			itemDetails = { id: parseInt(assembly.PartNumber,10) }
		}
		return Object.assign(assembly, constants.DETAILS_TPL, itemDetails);
	})

}

export const materialFilter = (state = constants.MATERIAL_ALL, action) => {
	switch(action.type) {
		case constants.SET_MATERIAL_FILTER:
			return action.filter
		default:
			return state
	}
}

export function results(state = constants.RESULTS, action) {
	switch(action.type) {
		case constants.SHOW_PREVIOUS_RESULT:
			var newIdx = state.selectedIdx - 1;
			if (newIdx < 0) {
				return state;
			}
			var newSelected = state.items[newIdx];
			return Object.assign({}, state, {selectedIdx: newIdx, selected: newSelected})

		case constants.SHOW_NEXT_RESULT:
			var newIdx = state.selectedIdx + 1;
			if (newIdx > (state.total - 1)) {
				return state;
			}
			var newSelected = state.items[newIdx];
			return Object.assign({}, state, { selectedIdx: newIdx, selected: newSelected})

		case constants.SHOW_RESULT_AT_IDX:
			if (action.idx < 0 || action.idx >= state.items.length) {
				return state;
			}
			var newSelected = state.items[action.idx];
			return Object.assign({}, state, { selectedIdx: action.idx, selected: newSelected});

		case constants.REQUEST_ASSEMBLIES:
			return Object.assign({}, state, {isFetching: true})

		case constants.RECEIVE_ASSEMBLIES:

			let assemblies = mergeInDetails(action.assemblies);
			return Object.assign({}, state, {
					selected: assemblies[0],
					selectedIdx: 0,
					total: assemblies.length,
					items: assemblies,
					type: constants.ASSEMBLY_RESULT,
					receivedAt: action.receivedAt,
					isFetching: false
			})

		case constants.REQUEST_HUBS:
			return Object.assign({}, state, {isFetching: true})

		case constants.RECEIVE_HUBS:
			console.log('RECEIVE_HUBS here');
			let hubs = mergeInDetails(action.hubs);
			return Object.assign({}, state, {
					selected: hubs[0],
					selectedIdx: 0,
					total: hubs.length,
					items: hubs,
					type: constants.SEARCH_ASSEMBLY_RESULT,
					receivedAt: action.receivedAt,
					isFetching: false
			})
		case constants.INVALIDATE_HUBS:
		case constants.INVALIDATE_ASSEMBLIES:
			return Object.assign({}, state, constants.RESULTS)
		default:
			return state;
	}
}

function appState(state = constants.APPSTATE, action) {
	switch(action.type) {
		case constants.UPDATE_STEP:
			return Object.assign({}, state, { step: action.step })
		case constants.DECREMENT_STEP:
			return Object.assign({}, state, { step: state.step - 1 })
		case constants.INCREMENT_STEP:
			return Object.assign({}, state, { step: state.step + 1 })
		case constants.UPDATE_LAST_PAGE:
			return Object.assign({}, state, {lastPath: action.lastPath})
		case constants.RECIEVE_CATEGORIES:
			return Object.assign({}, state, {categories: action.categories, isFetching: false})
		case constants.INVALIDATE_CATEGORIES:
			return Object.assign({}, state, {categories: []})
		case constants.REQUEST_CATEGORIES:
			return Object.assign({}, state, {isFetching: true})

		case constants.RECIEVE_FILTERS:
			return Object.assign({}, state, {filterResults: action.filters, isFetching: false, needsFetch: false})
		case constants.INVALIDATE_FILTERS:
			return Object.assign({}, state, {filterResults: [], isFetching: false})
		case constants.REQUEST_FILTERS:
			return Object.assign({}, state, {isFetching: true, needsFetch: false})

		case constants.UPDATE_FILTER_VALUE:
			const idx = action.idx;
			const newIndex = idx + 1;

			const newFilterState = [
				...state.filterState.slice(0, idx),
    		action.value,
    		...state.filterState.slice(idx + 1)
			];
			const newId = state.categories[newIndex].Id;
			return Object.assign(
					{},
					state,
					{isFetching: true, needsFetch: true, currentIndex: newIndex, filterState: newFilterState})
		default:
			return state;
	}
}

const rootReducer = combineReducers(Object.assign({}, {
  truckMakes,
	results,
  hubSelector,
	appState,
	materialFilter
}, {
  routing: routeReducer
}))

export default rootReducer
