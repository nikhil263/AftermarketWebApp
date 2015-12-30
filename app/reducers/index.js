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

export function hubAssemblies(state = [], action) {
	return state;
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
	hubAssemblies,
  hubSelector,
	appState
}, {
  routing: routeReducer
}))

export default rootReducer
