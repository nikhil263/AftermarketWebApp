import {
	API,
	APITEMP,
	V2KEY,
	ZERO_RESULTS,
	RECIEVE_IMAGES,
	REQUEST_IMAGES,
	INVALIDATE_IMAGES,
	INCACHE_IMAGE
} from '../config/constants'
import _ from 'lodash'
import fetch from 'isomorphic-fetch'
import { pushPath } from 'redux-simple-router'


export const receiveImages = (id, json, state) => {
	let images = []
	if (json.Status != ZERO_RESULTS) {
		json.Results.map(image => {
			images.push(Object.assign(image, {id: id}))
		})
  }
	return  {
    type: RECIEVE_IMAGES,
		id,
    images
  }
}

export const requestImages = (id) => {
  return {
    type: REQUEST_IMAGES,
    filterId: id
  }
}

export const invalidateImages = () => {
  return {
    type: INVALIDATE_IMAGES
  }
}

export const inCache = (id) => {
	return {
		type: INCACHE_IMAGE,
		id: id
	}
}

var imageInCache = (id, state) => {
	if (_.find(state.cache, {id: id})) {
		return true
	}
	return false
}

export const fetchImages = (id, state) => {

		return dispatch => {
			console.log(id)
			dispatch(requestImages(id))
			if (imageInCache(id,state)) {
				dispatch(inCache(id))
			} else {
				let url = API+'/images/'+id;
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
				.then(json => {
					dispatch(receiveImages(id, json, state))
				})
			}


	}
}
