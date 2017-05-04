import * as constants from '../config/constants'
import _ from 'lodash'

export const app = (state = constants.APPSTATE, action)  => {
	switch(action.type) {
		case constants.RESET_APP_STATE:
			return Object.assign({}, state, {filterState: constants.APPSTATE.filterState})
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
			return Object.assign({}, state, {goingBack: action.back, currentIndex: action.idx, filterResults: [], isFetching: false})
		case constants.RECIEVE_FILTERS:
			return Object.assign({}, state, {filterResults: action.filters, isFetching: false, needsFetch: false})
		case constants.INVALIDATE_FILTERS:
			return Object.assign({}, state, {filterResults: [], isFetching: false})
		case constants.REQUEST_FILTERS:
			return Object.assign({}, state, {isFetching: true, needsFetch: false})

		case constants.SET_RESULT_INDEX:
			return Object.assign({}, state, {currentIndex: 11})

		case constants.UPDATE_FILTER_VALUE:
			const idx = action.idx;
			const newIndex = (state.filterState.length > idx + 2) ? idx + 1 : idx; // +2 handles the results page
			console.log('update filter value', action.value)
			const newFilterState = Object.assign({}, state.filterState, action.filterState);
			console.log('update filter value state', state)
			console.log('update filter value', action.filterState, newFilterState)
			var choice = {};

			if (state.filterResults.length) { //TODO: try to figure out a better way to handle this.
				// choice = _.find(state.filterResults, {Id: action.value})
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
