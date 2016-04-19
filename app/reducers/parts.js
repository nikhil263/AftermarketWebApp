import {
	RECIEVE_PARTS,
	REQUEST_PARTS,
	INVALIDATE_PARTS
} from '../config/constants'
import _ from 'lodash'

const defaultState = {
	AftermarketParts: [],
	HubAssemblyNumber: '',
	HubAssemblyDescription: '',
	isFetching: false,
	needsFetch: false
}

export const parts = (state = defaultState, action) => {
	const newResult = Object.assign([], state.result)
	switch(action.type) {
		case RECIEVE_PARTS:
			return Object.assign({}, state, {
				isFetching:false,
				HubAssemblyNumber: action.HubAssemblyNumber,
				HubAssemblyDescription: action.HubAssemblyDescription,
				AftermarketParts: action.AftermarketParts,
				hubId: action.hubId
			})
		case REQUEST_PARTS:
			return Object.assign({}, state, {hubId: action.hubId, isFetching: true})
		case INVALIDATE_PARTS:
			return Object.assign({}, state, {results: [], isFetching: false, needsFetch: true})

		default:
			return state
	}
}
