import {expect} from 'chai'
import {
	receiveFilters,
	requestFilters,
	invalidateFilters,
	fetchFilters,
	setActiveFilterId,
	setActiveFilterValue,
	updateFilterAndNext
} from '../../app/actions/filters'
import {
	RECIEVE_FILTERS,
	REQUEST_FILTERS,
	INVALIDATE_FILTERS,
	OK,
	ZERO_RESULTS,
	UPDATE_FILTER_ID,
	UPDATE_FILTER_VALUE
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
  it('should receive filters choices after fetch', () => {
		const filterId = 2
		const expectedAction = {
      type: RECIEVE_FILTERS,
			filterId: filterId,
			filters: SUCCESS_MOCK.Results
		}
    expect(receiveFilters(filterId, SUCCESS_MOCK)).to.eql(expectedAction)
	})

	it('should handle receiving zero results', () => {
    const expectedAction = {
      type: RECIEVE_FILTERS,
			filters: []
		}
    expect(receiveFilters(FAIL_MOCK)).to.eql(expectedAction)
	})

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
		const filterValue = 2;
		const filterId = 1;
		const expectedAction = {
			type: UPDATE_FILTER_VALUE,
			id: id,
			value: value
		}
		expect(setActiveFilterValue(filterId, filterValue)).to.eql(expectedAction)
	})

	//TODO: How do you test async network request
})
