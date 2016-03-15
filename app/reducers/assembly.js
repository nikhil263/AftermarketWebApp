import {
	RECIEVE_ASSEMBLY_DETAILS,
	REQUEST_ASSEMBLY_DETAILS,
	INVALIDATE_ASSEMBLY_DETAILS,
	RECIEVE_IMAGES,
	REQUEST_IMAGES,
	INVALIDATE_IMAGES,
	INCACHE_IMAGE
} from '../config/constants'
import _ from 'lodash'

const defaultState = {
	result: [],
	isFetching: false,
	needsFetch: false
}

export const assembly = (state = defaultState, action) => {
	const newResult = Object.assign([], state.result)
	switch(action.type) {
		case RECIEVE_ASSEMBLY_DETAILS:
			return Object.assign({}, state, {result: action.results, id: action.id})
		case REQUEST_ASSEMBLY_DETAILS:
			return Object.assign({}, state, {isFetching: false})
		case INVALIDATE_ASSEMBLY_DETAILS:
			return Object.assign({}, state, {isFetching: true, needsFetch: false})
		case RECIEVE_IMAGES:
		case INCACHE_IMAGE:
			if (newResult.length > 0) {
				newResult[0].image = action.images;
			}
			return Object.assign({}, state, { result: newResult})
		case INVALIDATE_IMAGES:
			if (newResult.length > 0) {
				newResult[0].image = [];
			}
			return Object.assign({}, state, { result: newResult})

		default:
			return state
	}
}
