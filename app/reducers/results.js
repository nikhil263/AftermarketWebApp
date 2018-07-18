
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
	ASSEMBLY_NUMBER_DATA,
    HUB_ASSEMBLY_FILTERS,
    HUB_ASSEMBLY_FILTER_VALUE,
    RECEIVE_HUBS_CROSS_API,
    OPTIONAL_SPINDLE_NUT,
    DETAILS_TPL,
    DRUM_NUMBER_DATA,
    DRUM_RESULT,
    DRUM_DETAILS,
    DRUM_FILTER_VALUES,
    REQUEST_DRUMS,
    RESET_DRUM_FILTER,
    ROTOR_NUMBER_DATA,
    DRUM_FILTER_CATEGORIES,
    SELECTED_ROTOR_NUMBER
} from '../config/constants'
import _ from 'lodash'
import {ROTOR_DETAILS, ROTOR_FILTER_CATEGORIES, ROTOR_FILTER_VALUES, ROTOR_RESULT} from "config/constants";

const mergeInDetails = (assemblies = []) => {

	return assemblies.map(assembly => {
		var itemDetails = _.find(AFTERMARKET_DETAILS, detail => {
			return assembly.HubAssemblyNumber === detail.id.toString();
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

			// let assemblies = mergeInDetails(action.assemblies);
			let assemblies = action.assemblies;
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
			let hubs = action.hubs;
			return Object.assign({}, state, {
					selected: hubs[0],
					selectedIdx: 0,
					total: hubs.length,
					items: hubs,
					type: SEARCH_ASSEMBLY_RESULT,
					receivedAt: action.receivedAt,
					isFetching: false
			})
		case ASSEMBLY_NUMBER_DATA:
			let assemblyNumber = action.assemblyNumber;
			return Object.assign({}, state, {
				assemblyNumber: assemblyNumber,
				isFetching: false
			});
        case DRUM_RESULT: {
            if (action.data.Status === 'ZERO_RESULTS') {
                return Object.assign({}, state, {
                    isFetching: false,
                    isZeroResults: true,
                });
            }

            return Object.assign({}, state, {
                drumResult: action.data.Results,
                isFetching: false,
                isZeroResults: false,
            });
        }
        case DRUM_NUMBER_DATA:
            let drumNumber = action.drumNumber;
            return Object.assign({}, state, {
                drumNumber: drumNumber,
                isFetching: false
            });
		case ROTOR_NUMBER_DATA:
            return Object.assign({}, state, {
                rotorNumber: action.rotorNumber,
                isFetching: false
            });
        case ROTOR_RESULT: {
            if (action.data.Status === 'ZERO_RESULTS') {
                return Object.assign({}, state, {
                    rotorResult: [],
                    isFetching: false,
                    isZeroResults: true,
                });
            }

            return Object.assign({}, state, {
                rotorResult: action.data.Results,
                isFetching: false,
                isZeroResults: false,
            });
        }
        case DRUM_DETAILS:
            return Object.assign({}, state, {
            	drumDetail: action.data.Results,
                isFetching: false
            });
        case ROTOR_DETAILS:
            return Object.assign({}, state, {
                rotorDetail: action.data.Results,
                isFetching: false
            });
		case DRUM_FILTER_CATEGORIES:
            return Object.assign({}, state, {
                drumFilters: action.data,
                isFetching: false
            });
        case ROTOR_FILTER_CATEGORIES:
            return Object.assign({}, state, {
                rotorFilters: action.data,
                isFetching: false
            });
        case DRUM_FILTER_VALUES:
            return Object.assign({}, state, {
                drumFilterValue: action.data.Results,
                isFetching: false,
                isFilterValueSingle: true
            });
        case ROTOR_FILTER_VALUES:
            return Object.assign({}, state, {
                rotorFilterValue: action.data.Results,
                isFetching: false,
                isFilterValueSingle: true
            });
        case SELECTED_ROTOR_NUMBER:
            console.log(action);
            return Object.assign({}, state, {
                selectedRotorNumber: action.rotorNumber
            });
        case REQUEST_DRUMS:
            return Object.assign({}, state, {
                isFilterValueSingle: action.isFilterValueSingle,
                isFetching: true,
				currentFilter: action.currentFilter
            });
        case RESET_DRUM_FILTER:
            return Object.assign({}, state, {
                currentFilter: '',
                drumFilterValue: []
            });
        case HUB_ASSEMBLY_FILTERS:
            return Object.assign({}, state, {
                filters: action.filters,
                isFetching: false
            });
        case HUB_ASSEMBLY_FILTER_VALUE:
            return Object.assign({}, state, {
                filter_value: action.filters,
                isFetching: false
            });
        case RECEIVE_HUBS_CROSS_API:
            return Object.assign({}, state, {
                items: action.filters,
                selected: action.filters.Results[0],
                selectedIdx: 0,
                total: action.filters.Results.length,
                isFetching: false
            });
        case OPTIONAL_SPINDLE_NUT:
            return Object.assign({}, state, {
                spindleNut: action.assemblyNumber.Results,
                isFetching: false
            });
		case INVALIDATE_HUBS:
		case INVALIDATE_ASSEMBLIES:
			return Object.assign({}, state, RESULTS)
		default:
			return state;
	}
}
