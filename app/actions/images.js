import {
	API,
	APITEMP,
	V2KEY,
	ZERO_RESULTS,
	RECIEVE_IMAGES,
	REQUEST_IMAGES,
	INVALIDATE_IMAGES,
	INCACHE_IMAGE,
	NO_IMAGE
} from '../config/constants'
import _ from 'lodash'
import fetch from 'isomorphic-fetch'
import { pushPath } from 'redux-simple-router'


export const receiveImages = (id, json, state) => {
	let images = []
	console.log('recieved json', json);
	if (json.Status != ZERO_RESULTS) {
		json.Results.map(image => {
			images.push(Object.assign(image, {id: id}))
		})
  }
	console.log('received', images);
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

export const inCache = (id, found) => {
	return {
		type: INCACHE_IMAGE,
		id: id,
		images: found
	}
}

var imageInCache = (id, state) => {
	console.log('checking cache', state)
	const images = _.filter(state.cache, {ImageId: id});
	return images
}

export const fetchImages = (images, state) => {
		const mainImage = images[0] || null
		console.log('First Image', mainImage)
		if (mainImage) {
			const id = mainImage.ImageId

		return dispatch => {
			dispatch(requestImages(id))
			const checkCache = imageInCache(id,state)
			if (checkCache.length > 0) {
				dispatch(inCache(id, checkCache))
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
						// console.log('API Error', err);
					}
				)
				.then(json => {
					console.log('before received', json);
					dispatch(receiveImages(id, json, state))
				})
			}
		}

	} else {
		return {
			type: NO_IMAGE
		}
	}
}
