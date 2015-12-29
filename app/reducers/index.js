import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import * as constants from '../config/constants'

function truckTypes(state = constants.TRUCKTYPES, action) {
	return state;
}
//https://aftermarketapi.conmetwheelends.com/filters/api/v1/filter/{filterId}/{partNumbers}/{aftermarketPartTypeIds}/{truckCompartmentIds}/{dutyRatingIds}/{brakeTypeIds}/{truckMakeIds}/{axlePositionIds}/{axleNameIds}/{grossAxleWeightRatingRangeIds}/{wheelTypeStudLengthIds}[?searchText]


function hubSelector(state = constants.FILTERSTATE, action) {
	switch(action.type) {
		case constants.UPDATE_FILTER:
			return Object.assign({}, state, action.update);
		default:
			return state;
	}
}

function hubAssemblies(state = [], action) {
	return state;
}

function appState(state = {}, action) {
	switch(action.type) {
		case constants.UPDATE_LAST_PAGE:
			return Object.assign({}, state, {lastPath: action.lastPath})
	}
	return state;
}

const rootReducer = combineReducers(Object.assign({}, {
  truckTypes,
	hubAssemblies,
  hubSelector,
	appState
}, {
  routing: routeReducer
}))

export default rootReducer
