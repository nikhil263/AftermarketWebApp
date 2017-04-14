import {expect} from 'chai'
import {
	receiveFilters,
	requestFilters,
	invalidateFilters,
	fetchFilters,
	setActiveFilterId,
	setActiveFilterValue,
	updateFilterAndNext,
	setVal,
	resetAppState
} from '../../app/actions/filters'
import {
	APPSTATE,
	RECIEVE_FILTERS,
	REQUEST_FILTERS,
	INVALIDATE_FILTERS,
	OK,
	ZERO_RESULTS,
	UPDATE_FILTER_ID,
	UPDATE_FILTER_VALUE,
	RESET_APP_STATE
	} from '../../app/config/constants'



const SUCCESS_MOCK = {
	      Status: OK,
	      Results: [
	          {
	              Id: 1,
	              Name: 'Tractor'
	          },
	          {
	              Id: 2,
	              Name: 'Trailor'
	          }
	      ]
	  }

const FAIL_MOCK = {
			      Status: ZERO_RESULTS,
						Message: 'Message'
			  }

describe('Filter Actions', () => {
	//TODO: Refactor to make actions more testable
	it('should receive filters choices after fetch', () => {
		const idx = 2
		const expectedAction = {
      type: RECIEVE_FILTERS,
			idx,
			filters: SUCCESS_MOCK.Results
		}
		expect(receiveFilters(idx, SUCCESS_MOCK)).to.be.a('function')
	})

	//TODO: Refactor to make actions more testable
	// it('should handle receiving zero results', () => {
	// 	const idx = 2
  //   const expectedAction = {
  //     type: RECIEVE_FILTERS,
	// 		idx,
	// 		filters: []
	// 	}
  //   expect(receiveFilters(idx, FAIL_MOCK)).to.eql(expectedAction)
	// })

	it('should handle request filters notification', () => {
		const filterId = 1
		const expectedAction = {
      type: REQUEST_FILTERS,
			filterId: filterId
		}
    expect(requestFilters(filterId)).to.eql(expectedAction)
	})

	it('should handle invalidate categories', () => {
    const expectedAction = {
      type: INVALIDATE_FILTERS
		}
    expect(invalidateFilters()).to.eql(expectedAction)
	})

	it('should have an action to update the current filter', () => {
		const filterId = 2;
		const expectedAction = {
			type: UPDATE_FILTER_ID,
			filterId: filterId
		}
		expect(setActiveFilterId(filterId)).to.eql(expectedAction)
	})

	it('should set the value at the filterId index', () => {
		const filterState = {tmake: 1};
		const idx = 1;
		const expectedAction = {
			type: UPDATE_FILTER_VALUE,
			idx,
			filterState,
			back: false
		}
		expect(setVal(idx, filterState)).to.eql(expectedAction)
	})

	it('should be able to reset the app state', () => {
		const expectedAction = {
			type: RESET_APP_STATE
		}
		expect(resetAppState()).to.eql(expectedAction)
	})

	//TODO: How do you test async network request
})
