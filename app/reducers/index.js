import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import * as constants from '../config/constants'
import _ from 'lodash'
import { assembly } from './assembly'
import { results } from './results'
import { images } from './images'


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

		case constants.START_NEW_FILTER:
			return Object.assign({}, state, constants.APPSTATE)

		case constants.PREVIOUS_FILTER_INDEX:
			const newIdx = (-1 !== state.currentIndex) ? state.currentIndex - 1 : -1;
			return Object.assign({}, state, {goingBack: action.back, currentIndex: newIdx, filterResults: [], isFetching: false})
		case constants.RECIEVE_FILTERS:
			return Object.assign({}, state, {filterResults: action.filters, isFetching: false, needsFetch: false})
		case constants.INVALIDATE_FILTERS:
			return Object.assign({}, state, {filterResults: [], isFetching: false})
		case constants.REQUEST_FILTERS:
			return Object.assign({}, state, {isFetching: true, needsFetch: false})

		case constants.UPDATE_FILTER_VALUE:
			const idx = action.idx;
			const newIndex = (state.filterState.length > idx + 1) ? idx + 1 : idx;
			console.log('update filter value', action.value)
			const newFilterState = [
				...state.filterState.slice(0, idx),
    		action.value,
    		...state.filterState.slice(idx + 1)
			];
			console.log('update filter value state', state)
			console.log('update filter value', action.value, newFilterState)
			var choice = {};
			if (state.filterResults.length) {
				choice = _.find(state.filterResults, {Id: action.value})
			}
			const newId = state.categories[newIndex].Id;
			return Object.assign(
					{},
					state,
					{
						goingBack: false,
						isFetching: true,
						needsFetch: true,
						currentIndex: newIndex,
						filterState: newFilterState,
						lastChoice: choice
					})
		default:
			return state;
	}
}

const rootReducer = combineReducers(Object.assign({}, {
	results,
	assembly,
	images,
	appState
}, {
  routing: routeReducer
}))

export default rootReducer
