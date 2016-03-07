import {
	RECIEVE_IMAGES,
	REQUEST_IMAGES,
	INVALIDATE_IMAGES
} from '../config/constants'
import _ from 'lodash'

const defaultState = {
	cache: [],
	isFetching: false,
	needsFetch: false
}

export const images = (state = defaultState, action) => {
	switch(action.type) {
		case RECIEVE_IMAGES:
			const newCache = [...state.cache, ...action.images]
			return Object.assign({}, state, {cache: newCache})
		case REQUEST_IMAGES:
			return Object.assign({}, state, {isFetching: false})
		case INVALIDATE_IMAGES:
			return Object.assign({}, state, {isFetching: true, needsFetch: false})
		default:
			return state
	}
}
