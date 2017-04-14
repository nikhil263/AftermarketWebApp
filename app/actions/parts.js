import {
	API,
	V2KEY,
	ZERO_RESULTS,
	RECIEVE_PARTS,
	REQUEST_PARTS,
	INVALIDATE_PARTS
} from '../config/constants'
import _ from 'lodash'
import fetch from 'isomorphic-fetch'
import { pushPath } from 'redux-simple-router'


export const requestParts = (hubId) => {
  return {
    type: REQUEST_PARTS,
    hubId
  }
}

export const receiveParts = (hubId, json, date = Date.now()) => {
  let HubAssemblyDescription = ''
	let HubAssemblyNumber = ''
	let AftermarketParts = []
	if (json.Status != ZERO_RESULTS) {
		HubAssemblyDescription = json.Results[0].HubAssemblyDescription
		HubAssemblyNumber = json.Results[0].HubAssemblyNumber
		AftermarketParts = json.Results[0].AftermarketParts
	}
  return {
    type: RECIEVE_PARTS,
		hubId,
    HubAssemblyDescription:HubAssemblyDescription,
		HubAssemblyNumber:HubAssemblyNumber,
		AftermarketParts: AftermarketParts,
    receivedAt: date,
    status: json.Status
  }
}

export const fetchParts = (hubId) => {
  return dispatch => {
    dispatch(requestParts(hubId))
		let url = API+'/aftermarketparts?hanum='+hubId;
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
    .then(json => dispatch(receiveParts(hubId, json)))
  }
}

export const invalidateParts = () => {
  return {
    type: INVALIDATE_PARTS,
  }
}
