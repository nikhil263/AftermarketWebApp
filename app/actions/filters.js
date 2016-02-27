import {
	API,
	V2KEY,
	ZERO_RESULTS,
	RECIEVE_FILTERS,
	REQUEST_FILTERS,
	INVALIDATE_FILTERS,
	UPDATE_FILTER_ID,
	UPDATE_FILTER_VALUE,
	PREVIOUS_FILTER_INDEX,
	FINDER_START,
	STEP_NAVIGATION
} from '../config/constants'
import _ from 'lodash'
import fetch from 'isomorphic-fetch'
import { pushPath } from 'redux-simple-router'

export const checkFilterStatus = (app) => {
	if (app.filterState[1] !== '~' ) {
		return true
	}
}

export const setActiveFilterId = (filterId) => {
	return {
		type: UPDATE_FILTER_ID,
		filterId: filterId
	}
}

export const setActiveFilterValue = (idx, value) => {
	return {
		type: UPDATE_FILTER_VALUE,
		idx: idx,
		value: value
	}
}


export const nextFilter = (url) => {
	return dispatch => {
		dispatch(invalidateFilters())
		dispatch(pushPath(url))
	}
}


export const previousFilter = (app) => {
	const prevIndex = (0 !== app.currentIndex) ? app.currentIndex-1 : 0
	const url = STEP_NAVIGATION[prevIndex].path
	
	return dispatch => {
		dispatch(decreaseIndex())
		dispatch(pushPath(url))
	}
}

export const decreaseIndex = () => {
	return {
		type: PREVIOUS_FILTER_INDEX,
	}
}

export const receiveFilters = (idx, json) => {
  let filters = [];
  if (json.Status != ZERO_RESULTS) {
    filters = json.Results;
  }
  return {
    type: RECIEVE_FILTERS,
		idx: idx,
    filters: filters
  }
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
					dispatch(requestFilters(id))

					var id = 0;
					if (state.filterState.length > idx) {
						console.log(idx, state.categories[idx])
						id = state.categories[idx].Id
					}
					const searchFilterState = [
						...state.filterState.slice(0, idx),
						'~',
		    		...state.filterState.slice(idx + 1)
					];

					let searchParams = searchFilterState.join('/');

					let url = API+'/hubassembly/filtervalues/'+id+'/'+searchParams;
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
							console.log('API Error', err);
						}
					)
					.then(json => dispatch(receiveFilters(idx, json)))

			}
		}
		return dispatch => {
			dispatch(pushPath(FINDER_START));
		}
}
