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
	STEP_NAVIGATION,
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

export const setActiveFilterValue = (idx, value, state) => {
	return dispatch => {
		dispatch(setVal(idx, value))
		dispatch(nextFilter(idx, state))
	}

}

export const setVal = (idx, value) => {
	return {
		type: UPDATE_FILTER_VALUE,
		idx: idx,
		value: value,
		back: false
	}
}


export const nextFilter = (idx, state) => {
	const nextIndex = (STEP_NAVIGATION.length > idx + 1) ? idx+1 : idx
	const url = STEP_NAVIGATION[nextIndex].path
	return dispatch => {
		dispatch(invalidateFilters())
		dispatch(pushPath(url))
	}
}


export const previousFilter = (state) => {
	const idx = state.currentIndex;

	const url = STEP_NAVIGATION[idx].path

	return dispatch => {
		dispatch(decreaseIndex())
		dispatch(pushPath(url))
	}
}

export const decreaseIndex = () => {
	return {
		type: PREVIOUS_FILTER_INDEX,
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
    filters: _.reject(json.Results, {Id:0, Name:'—'})
  }
	return dispatch => {
		if(json.Results.length === 1) { // don't set on going back
			// console.log('FOUND ONLY 1')
			if (state.goingBack === true) { // go skip and don't set
				dispatch(previousFilter(state))
			} else {
				dispatch(setActiveFilterValue(idx, filters[0].Id, state))
			}

		} else {
			dispatch(recieve)
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
						// console.log(idx, state.categories[idx])
						id = state.categories[idx].Id
					}

					const searchFilterState = state.filterState.map(function(item, index){
						// console.log(index,item, idx)

						if (index < idx) {
							return item
						}
						return '~'
					})

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
