import {
	APIV13,
		V2KEY,
		ZERO_RESULTS,
		RECIEVE_FILTERS,
		REQUEST_FILTERS,
		INVALIDATE_FILTERS,
		UPDATE_FILTER_ID,
		UPDATE_FILTER_VALUE,
		PREVIOUS_FILTER_INDEX,
		PUSH_FILTER_HISTORY,
		POP_FILTER_HISTORY,
		FINDER_START,
		STEP_NAVIGATION,
  	ROTOT_SPLINED,
		RESET_APP_STATE
} from '../config/constants'
import _ from 'lodash'
import fetch from 'isomorphic-fetch'
import { pushPath } from 'redux-simple-router'


export const resetAppState = () => {
	return {
		type: RESET_APP_STATE
	}
}

export const setRotorSpilned = (payload) => {
  return {
    type: ROTOT_SPLINED,
    payload
  }
}

export const checkFilterStatus = (app) => {
	if (app.filterState.tcomp !== null ) {
		return true
	}
}

export const setActiveFilterId = (filterId) => {
	return {
		type: UPDATE_FILTER_ID,
		filterId: filterId
	}
}

export const setActiveFilterValue = (idx, filterState, state) => {
	return dispatch => {
		dispatch(setVal(idx, filterState))
		dispatch(nextFilter(idx, state))
	}
}

export const setVal = (idx, filterState) => {
	return {
		type: UPDATE_FILTER_VALUE,
		idx,
		filterState,
		back: false
	}
}


export const nextFilter = (idx, state) => {
	console.log('currentINDEX', idx);
	let nextIndex;
	if(state.currentIndex === undefined){
		nextIndex = STEP_NAVIGATION.map(x => x.path).indexOf(state);
	}
	else{
		nextIndex = (STEP_NAVIGATION.length > idx+1) ? idx+1 : idx
	}
	console.log('nextINDEX', nextIndex, STEP_NAVIGATION.length);
	const url = STEP_NAVIGATION[nextIndex].path
	return dispatch => {
		dispatch(invalidateFilters())
		console.log('next', url);
		dispatch(pushPath(url))
	}
}


export const previousFilter = (state) => {
	if(state.filterHistory === undefined || state.filterHistory.length == 0 || state.filterHistory.length == 1){

		const idx = state.currentIndex;
		let newIdx = (-1 !== state.currentIndex) ? state.currentIndex - 1 : -1;
		newIdx = (newIdx === 1) ? 0 : newIdx;
		const url = STEP_NAVIGATION[newIdx].path

		return dispatch => {
			dispatch(decreaseIndex(newIdx))
			dispatch(pushPath(url))
		}
	}
	else{
		return dispatch => {
			let newFilterHistory = state.filterHistory;
			newFilterHistory.pop();
			dispatch(popFilterHistory(newFilterHistory, state))
			dispatch(pushPath(state.filterHistory[state.filterHistory.length - 1]))
		}
	}
}

export const decreaseIndex = (idx) => {
	return {
		type: PREVIOUS_FILTER_INDEX,
		idx: idx,
		back: true,
	}
}

export const receiveFilters = (idx, json, state) => {
	let filters = [];
	if (json.Status != ZERO_RESULTS) {
		filters = json.Results
	}
	const recieve = {
		type: RECIEVE_FILTERS,
		idx: idx,
		filters: _.reject(json.Results, {Id:0})
	}
	return dispatch => {
		if(json.Results.length === 1) { // don't set on going back
			// console.log('FOUND ONLY 1')
			if (state.goingBack === true) { // go skip and don't set
				dispatch(previousFilter(state))
			} else {
				let currentCategory = state.categories[idx];
				let filterValue = {};
				filterValue[currentCategory.QueryParameterName] = filters[0].Id;
				dispatch(setActiveFilterValue(idx, filterValue, state))
			}

		} else {
			if(state.filterHistory[state.filterHistory.length - 1] != STEP_NAVIGATION[idx].path )
			{
				dispatch(pushFilterHistory(STEP_NAVIGATION[idx].path, state));
			}

			dispatch(recieve);
		}

	}
	return
}
export const requestFilters = (id) => {
	return {
		type: REQUEST_FILTERS,
		filterId: id
	}
}

export const invalidateFilters = () => {
	return {
		type: INVALIDATE_FILTERS
	}
}

export const pushFilterHistory = (url) => {
	return {
		type: PUSH_FILTER_HISTORY,
		filterHistory: url
	}
}

export const popFilterHistory = (newFilterHistory, state) => {
	let newFilterIndex = STEP_NAVIGATION.map(x => x.path).indexOf(state.filterHistory[state.filterHistory.length - 1])
	return {
		type: POP_FILTER_HISTORY,
		filterHistory: newFilterHistory,
		idx: newFilterIndex
	}
}

// TODO: Refactor
// Need to update the store and fetch in one call
// update the searchParams to include the new value
// create a new idx by using idx + 1
// request new filters
// with the response set filterState, set idx, set results
// do away with the ID and just use filter categories order with the index

export const fetchFilters = (idx, state) => {

	if (checkFilterStatus(state)){

		return dispatch => {
			dispatch(requestFilters(idx))

			var id = 0;
			let filterName = ''
			if (state.categories.length > idx) {
				// console.log(idx, state.categories[idx])
				id = state.categories[idx].Id
				filterName = state.categories[idx].QueryParameterName
			}

			let searchFilterState = [];

			// const searchFilterState = state.filterState.map(function(item, index){
			// 	// console.log(index,item, idx)
			//
			// 	if (index < idx) {
			// 		return item
			// 	}
			// 	return '~'
			// })

			_.each(state.filterState, (value, key) => {
				// need to have index of the category as well.
				let index = _.findLastIndex(state.categories, { 'QueryParameterName': key})
				if (value && index < idx) {
					searchFilterState.push(`${key}=${value}`);
				}
			});



			let searchParams = searchFilterState.join('&');

			let url = APIV13+'/hubassembly/filtervalues/'+filterName+'?'+searchParams;
			return fetch(url, {
				method: 'get',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Ocp-Apim-Subscription-Key': V2KEY
				}
			})
				.then(
					response => response.json(),
					err => {
						// console.log('API Error', err);
					}
				)
				.then(json => {

					dispatch(receiveFilters(idx, json, state))
				})

		}
	}
	return dispatch => {
		dispatch(pushPath(FINDER_START));
	}
}
