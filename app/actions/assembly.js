import {
	API,
	V2KEY,
	ZERO_RESULTS,
	RECIEVE_ASSEMBLY_DETAILS,
	REQUEST_ASSEMBLY_DETAILS,
	INVALIDATE_ASSEMBLY_DETAILS
} from '../config/constants'
import _ from 'lodash'
import fetch from 'isomorphic-fetch'
import { pushPath } from 'redux-simple-router'

export const receiveAssemblyDetails = (id, json) => {
  let results = [];
  if (json.Status !== ZERO_RESULTS) {
    results = json.Results;
  }
  return {
    type: RECIEVE_ASSEMBLY_DETAILS,
		id: id,
    results: results
  }
}
export const requestAssemblyDetails = (id) => {
  return {
    type: REQUEST_ASSEMBLY_DETAILS,
    id: id
  }
}

export const invalidateAssemblyDetails = () => {
  return {
    type: INVALIDATE_ASSEMBLY_DETAILS
  }
}

export const fetchAssemblyDetails = (id, state) => {

				//10082201

				return dispatch => {
					dispatch(requestAssemblyDetails(id))

					let url = API+'/hubassemblydetails/'+id;
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
					.then(json => dispatch(receiveAssemblyDetails(id, json)))

			}

}
