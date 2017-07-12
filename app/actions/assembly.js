import {
	API,
	APIV10,
	V2KEY,
	ZERO_RESULTS,
	INVALIDATE_ASSEMBLIES,
	REQUEST_ASSEMBLIES,
	RECEIVE_ASSEMBLIES,
	RECIEVE_ASSEMBLY_DETAILS,
	REQUEST_ASSEMBLY_DETAILS,
	INVALIDATE_ASSEMBLY_DETAILS,
	IMAGE_CDN,
	SET_RESULT_INDEX
} from '../config/constants'
import _ from 'lodash'
import fetch from 'isomorphic-fetch'
import { pushPath } from 'redux-simple-router'

export const receiveAssemblyDetails = (id, json, images) => {
	var results = [];
	var needsImage = false;
  if (json.Status !== ZERO_RESULTS) {
    const newFormat = json.Results.map( detail => {
					let mainImage = _.find(detail.Images, {ImageTypeId: 1}) || null
					needsImage = (detail.Images.length > 0)


					if (mainImage) {
						results.push(Object.assign(detail, {
							mainImageId: IMAGE_CDN+'/'+mainImage.ImageGuid

						}))

					} else {
						results.push(Object.assign(detail, {
							mainImageId: null
						}))
					}




				})

	}
	return dispatch => {
		dispatch({
	    type: RECIEVE_ASSEMBLY_DETAILS,
			id: id,
	    results: results
	  })

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

export const fetchAssemblyDetails = (id, images) => {

				//10082201

				return dispatch => {
					dispatch(requestAssemblyDetails(id))

					let url = `${API}/hubassemblydetails/${id}`;
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
							dispatch(receiveAssemblyDetails(id, json, images))
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



						assemblies.push(Object.assign(detail, {
							Description: detail.AftermarketDescription,
							PartNumber: detail.HubAssemblyNumber
						}));


				})

  }

  return dispatch => {
    dispatch({type: RECEIVE_ASSEMBLIES,
    hub: hub,
    assemblies: assemblies,
    receivedAt: date,
    status: json.Status})

		dispatch({type: SET_RESULT_INDEX})
  }
}



export const fetchAssembly = (state) => {
  return dispatch => {
    dispatch(requestAssembly(state))

		let searchFilterState = [];
		_.each(state.filterState, (value, key) => {
			console.log(value, key)
			if (value) {
				searchFilterState.push(`${key}=${value}`);
			}

		});
		let searchParams = searchFilterState.join('&');

    let url = API+'/hubassembly/filtervalues/hanum?'+searchParams;
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
