import {
	API,
	V2KEY,
	RECIEVE_CATEGORIES,
	REQUEST_CATEGORIES,
	INVALIDATE_CATEGORIES} from '../config/constants'
import _ from 'lodash'
import fetch from 'isomorphic-fetch'

export const receiveCategories = (json = []) => {
  let categories = [];
	if (json.length > 0) {
		categories = json;
	}
  return {
    type: RECIEVE_CATEGORIES,
    categories: categories
  }
}
export const requestCategories = () => {
  return {
    type: REQUEST_CATEGORIES
  }
}

export const invalidateCategories = () => {
  return {
    type: INVALIDATE_CATEGORIES,
  }
}

export const fetchCategories = () => {
  return dispatch => {
    dispatch(requestCategories())
    let url = API+'/hubassembly/filtercategories/';
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
    .then(json => dispatch(receiveCategories(json)))
  }
}
