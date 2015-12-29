import {expect} from 'chai'
import * as actions from '../../app/actions'
import { UPDATE_FILTER, UPDATE_LAST_PAGE } from '../../app/config/constants'
console.log(actions.updateFilters)
describe('actions', () => {
  it('should create an action to update filters', () => {
    const addedObject = { dutyRatingIds: 'heavy' }
    const expectedAction = {
      type: UPDATE_FILTER,
      update: addedObject
    }
		expect(actions.updateFilters(addedObject)).to.eql(expectedAction)
  })
	it('update filter action should handle multiple filters', () => {
    const addedObject = {
			dutyRatingIds: 'heavy',
			brakeTypeIds: 'disc'
		}
    const expectedAction = {
      type: UPDATE_FILTER,
      update: addedObject
    }
		expect(actions.updateFilters(addedObject)).to.eql(expectedAction)
  })
	it('should create an action to reset filters', () => {
		const addedObject = { dutyRatingIds: '~' }
		const expectedAction = {
      type: UPDATE_FILTER,
      update: addedObject
    }
		expect(actions.resetFilters(addedObject)).to.eql(expectedAction)
  })

	it('should create an action to update last page', () => {
		const path = 'hub-selection/step-two'
		const expectedAction = {
      type: UPDATE_LAST_PAGE,
      lastPath: path
    }
		expect(actions.updateLastPage(path)).to.eql(expectedAction)
  })
})
