import {
	API,
	APITEMP,
	V2KEY,
	ZERO_RESULTS,
	INVALIDATE_ASSEMBLIES,
	REQUEST_ASSEMBLIES,
	RECEIVE_ASSEMBLIES,
	RECIEVE_ASSEMBLY_DETAILS,
	REQUEST_ASSEMBLY_DETAILS,
	INVALIDATE_ASSEMBLY_DETAILS
} from '../config/constants'
import _ from 'lodash'
import fetch from 'isomorphic-fetch'
import { pushPath } from 'redux-simple-router'
import {fetchImages} from './images'

export const receiveAssemblyDetails = (id, json) => {
	var results = [];
  if (json.Status !== ZERO_RESULTS) {
    const newFormat = json.Results.map( detail => {
					let mainImage = _.find(detail.Images, {ImageTypeId: 1}) || null

					if (mainImage) {
						results.push(Object.assign(detail, {
							mainImageId: mainImage.ImageId
						}))
					} else {
						results.push(detail)
					}




				})

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

					let url = APITEMP+'/hubassemblydetails/'+id;
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
							dispatch(receiveAssemblyDetails(id, json))
						}
					)

			}

}

export const requestAssembly = (hub) => {
  return {
    type: REQUEST_ASSEMBLIES,
    hub: hub
  }
}


export const receiveAssembly = (hub, json, date = Date.now()) => {

  let assemblies = []
  if (json.Status != ZERO_RESULTS) {
		const newFormat = json.Results.map( detail => {
					let mainImage = _.find(detail.Images, {ImageTypeId: 1}) || null

					if (mainImage) {
						assemblies.push(Object.assign(detail, {
							mainImageId: mainImage.ImageId,
							Description: detail.AftermarketDescription,
							PartNumber: detail.HubAssemblyNumber
						}));
					} else {
						assemblies.push(Object.assign(detail, {mainImageId: null}));
					}


				})

  }
  return {
    type: RECEIVE_ASSEMBLIES,
    hub: hub,
    assemblies: assemblies,
    receivedAt: date,
    status: json.Status
  }
}



export const fetchAssembly = (state) => {
  return dispatch => {
    dispatch(requestAssembly(state))

    let searchParams = state.filterState.join('/');
    let url = APITEMP+'/hubassembly/filtervalues/0/'+searchParams;
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
    .then(json => dispatch(receiveAssembly(state, json)))
  }
}

export const invalidateAssembly = () => {
  return {
    type: INVALIDATE_ASSEMBLIES,
  }
}
