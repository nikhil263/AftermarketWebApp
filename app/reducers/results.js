
import {
	RESULTS,
	SHOW_PREVIOUS_RESULT,
	SHOW_NEXT_RESULT,
	SHOW_RESULT_AT_IDX,
	REQUEST_ASSEMBLIES,
	RECEIVE_ASSEMBLIES,
	ASSEMBLY_RESULT,
	REQUEST_HUBS,
	RECEIVE_HUBS,
	SEARCH_ASSEMBLY_RESULT,
	INVALIDATE_HUBS,
	INVALIDATE_ASSEMBLIES,
	AFTERMARKET_DETAILS,
	DETAILS_TPL
} from '../config/constants'
import _ from 'lodash'

const mergeInDetails = (assemblies = []) => {

	return assemblies.map(assembly => {
		var itemDetails = _.find(AFTERMARKET_DETAILS, detail => {
			return assembly.PartNumber === detail.id.toString();
		})
		if (!itemDetails) {
			itemDetails = { id: parseInt(assembly.PartNumber,10) }
		}
		return Object.assign(assembly, DETAILS_TPL, itemDetails);
	})

}

export function results(state = RESULTS, action) {
	switch(action.type) {
		case SHOW_PREVIOUS_RESULT:
			var newIdx = state.selectedIdx - 1;
			if (newIdx < 0) {
				return state;
			}
			var newSelected = state.items[newIdx];
			return Object.assign({}, state, {selectedIdx: newIdx, selected: newSelected})

		case SHOW_NEXT_RESULT:
			var newIdx = state.selectedIdx + 1;
			if (newIdx > (state.total - 1)) {
				return state;
			}
			var newSelected = state.items[newIdx];
			return Object.assign({}, state, { selectedIdx: newIdx, selected: newSelected})

		case SHOW_RESULT_AT_IDX:
			if (action.idx < 0 || action.idx >= state.items.length) {
				return state;
			}
			var newSelected = state.items[action.idx];
			return Object.assign({}, state, { selectedIdx: action.idx, selected: newSelected});

		case REQUEST_ASSEMBLIES:
			return Object.assign({}, state, {isFetching: true})

		case RECEIVE_ASSEMBLIES:

			let assemblies = mergeInDetails(action.assemblies);
			return Object.assign({}, state, {
					selected: assemblies[0],
					selectedIdx: 0,
					total: assemblies.length,
					items: assemblies,
					type: ASSEMBLY_RESULT,
					receivedAt: action.receivedAt,
					isFetching: false
			})

		case REQUEST_HUBS:
			return Object.assign({}, state, {isFetching: true})

		case RECEIVE_HUBS:
			let hubs = mergeInDetails(action.hubs);
			return Object.assign({}, state, {
					selected: hubs[0],
					selectedIdx: 0,
					total: hubs.length,
					items: hubs,
					type: SEARCH_ASSEMBLY_RESULT,
					receivedAt: action.receivedAt,
					isFetching: false
			})
		case INVALIDATE_HUBS:
		case INVALIDATE_ASSEMBLIES:
			return Object.assign({}, state, RESULTS)
		default:
			return state;
	}
}
