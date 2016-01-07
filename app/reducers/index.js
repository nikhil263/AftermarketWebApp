import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import * as constants from '../config/constants'

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
		default:
			return state;
	}
}


const mergeInDetails = (assemblies) => {
	let detailsTpl = {
		id: 0, image: 'hub-fpo.png', title: ''
	}
	return assemblies.map(assembly => {
		var itemDetails = _.find(constants.AFTERMARKET_DETAILS, detail => {
			return assembly.PartNumber === detail.id.toString();
		})

		return Object.assign(assembly, detailsTpl, itemDetails);
	})

}

export function results(state = constants.RESULTS, action) {
	switch(action.type) {
		case constants.SHOW_PREVIOUS_RESULT:
			var newIdx = state.selectedIdx - 1;
			if (newIdx === 0) {
				return state;
			}
			var newSelected = state.items[newIdx];
			return Object.assign({}, state, {selectedIdx: newIdx, selected: newSelected})
		case constants.SHOW_NEXT_RESULT:
			var newIdx = state.selectedIdx + 1;
			if (newIdx === (state.total - 1)) {
				return state;
			}
			var newSelected = state.items[newIdx];
			return Object.assign({}, state, { selectedIdx: newIdx, selected: newSelected})
		case constants.SHOW_RESULT_AT_IDX:
			return state;
		case constants.RECEIVE_ASSEMBLIES:
			let assemblies = mergeInDetails(action.assemblies);
			return Object.assign({}, state, {
					selected: assemblies[0],
					selectedIdx: 0,
					total: assemblies.length,
					items: assemblies,
					type: constants.ASSEMBLY_RESULT,
					receivedAt: action.receivedAt
			})
		default:
			return state;
	}
}

function appState(state = constants.APPSTATE, action) {
	switch(action.type) {
		case constants.UPDATE_LAST_PAGE:
			return Object.assign({}, state, {lastPath: action.lastPath})
		default:
			return state;
	}
}

const rootReducer = combineReducers(Object.assign({}, {
  truckMakes,
	results,
  hubSelector,
	appState
}, {
  routing: routeReducer
}))

export default rootReducer
