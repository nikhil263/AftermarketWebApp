import {
	API,
	V2KEY,
	ZERO_RESULTS,
	RECIEVE_FILTERS,
	REQUEST_FILTERS,
	INVALIDATE_FILTERS,
	UPDATE_FILTER_ID,
	UPDATE_FILTER_VALUE
} from '../config/constants'
import _ from 'lodash'
import fetch from 'isomorphic-fetch'



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
  return dispatch => {
    dispatch(requestFilters(id))
		var id = 0;
		console.log(state.filterState.length, idx)
		if (state.filterState.length > idx) {
			console.log(idx, state.categories[idx])
			id = state.categories[idx].Id

		}
    let searchParams = state.filterState.join('/');

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
