import {
	RECIEVE_ASSEMBLY_DETAILS,
	REQUEST_ASSEMBLY_DETAILS,
	INVALIDATE_ASSEMBLY_DETAILS
} from '../config/constants'
import _ from 'lodash'

const defaultState = {
	result: [],
	isFetching: false,
	needsFetch: false
}

export const assembly = (state = defaultState, action) => {
	switch(action.type) {
		case RECIEVE_ASSEMBLY_DETAILS:
			return Object.assign({}, state, {result: action.results, id: action.id})
		case REQUEST_ASSEMBLY_DETAILS:
			return Object.assign({}, state, {isFetching: false})
		case INVALIDATE_ASSEMBLY_DETAILS:
			return Object.assign({}, state, {isFetching: true, needsFetch: false})
		default:
			return state
	}
}
