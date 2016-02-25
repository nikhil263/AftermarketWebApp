import {expect} from 'chai'
import * as actions from '../../app/actions/categories'
import {
  RECIEVE_CATEGORIES,
	REQUEST_CATEGORIES,
	INVALIDATE_CATEGORIES
	} from '../../app/config/constants'

const TEST_CATEGORIES = [
  {
    'Id': 0,
    'Name': 'Hub Assembly Number | Aftermarket Description',
    'Sort': 0,
    'UrlParameterName': 'aftermarketHubAssemblyNumbers'
  },
  {
    'Id': 2,
    'Name': 'Truck Compartment',
    'Sort': 1,
    'UrlParameterName': 'truckCompartmentIds'
  },
  {
    'Id': 5,
    'Name': 'Truck Make',
    'Sort': 2,
    'UrlParameterName': 'truckMakeIds'
  },
  {
    'Id': 7,
    'Name': 'Axle Name',
    'Sort': 3,
    'UrlParameterName': 'axleNameIds'
  },
  {
    'Id': 8,
    'Name': 'Gross Axle Weight Rating (GAWR) Range',
    'Sort': 4,
    'UrlParameterName': 'grossAxleWeightRatingRangeIds'
  },
  {
    'Id': 12,
    'Name': 'Axle Stud Thread Diameter',
    'Sort': 5,
    'UrlParameterName': 'axleStudThreadIds'
  },
  {
    'Id': 9,
    'Name': 'Wheel Material / Stud Length',
    'Sort': 6,
    'UrlParameterName': 'wheelMaterialStudLengthClassIds'
  },
  {
    'Id': 10,
    'Name': 'Hub Casting Material Type',
    'Sort': 7,
    'UrlParameterName': 'hubCastingMaterialTypeIds'
  },
  {
    'Id': 11,
    'Name': 'Hub Assembly Type',
    'Sort': 8,
    'UrlParameterName': 'hubAssemblyTypeIds'
  }
]

describe('Filter Categories', () => {
  it('should receive categories after fetch', () => {
    const expectedAction = {
      type: RECIEVE_CATEGORIES,
			categories: TEST_CATEGORIES
		}
    expect(actions.receiveCategories(TEST_CATEGORIES)).to.eql(expectedAction)
	})

	it('should handle request categories notification', () => {
    const expectedAction = {
      type: REQUEST_CATEGORIES
		}
    expect(actions.requestCategories()).to.eql(expectedAction)
	})

	it('should handle invalidate categories', () => {
    const expectedAction = {
      type: INVALIDATE_CATEGORIES
		}
    expect(actions.invalidateCategories()).to.eql(expectedAction)
	})

	//TODO: How do you test async network request
})
