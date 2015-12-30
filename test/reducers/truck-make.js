import {expect} from 'chai'
import { truckMakes, truckMake } from '../../app/reducers'
import * as actions from '../../app/actions'
import deepFreeze from 'deep-freeze'
import { TRUCKMAKES } from '../../app/config/constants'

describe('truckMakes reducer', () => {
	it('should not mutate the state', () => {
		const makeId = 2;
		const startState = TRUCKMAKES
		const action = actions.setSelectedTruckMake(makeId);
		deepFreeze(startState);
		var newState = truckMakes(startState, action);
		expect(newState).to.not.eql(startState)
	})
	it('should not alter the state if the id does not match', () => {
		const makeId = 1;
    const startState = { id: 2, name: 'FreightLiner', active: false }
		const action = actions.setSelectedTruckMake(makeId);
    deepFreeze(startState);
		var newState = truckMake(startState, action);
		expect(newState).to.eql(startState)
  })

	it('should set the selected truckMake to have an attribute of active = true', () => {
		const makeId = 1;
		const startState = { id: 1, name: 'FreightLiner', active: false }
		const endState = { id: 1, name: 'FreightLiner', active: true }
		const action = actions.setSelectedTruckMake(makeId);
    deepFreeze(startState);
		var newState = truckMake(startState, action);
		expect(newState).to.eql(endState)
  })

	it('should update the first item in the array to active true', () => {
		const makeId = 1;
		const startState = TRUCKMAKES
		const action = actions.setSelectedTruckMake(makeId);
    deepFreeze(startState);
		var newState = truckMakes(startState, action);
		expect(newState[0].active).to.be.true
  })

	it ('should reset the other items to be false', () => {
		const makeId = 1;
		const secondId = 2;
		const startState = TRUCKMAKES
		const action = actions.setSelectedTruckMake(makeId);
		const action2 = actions.setSelectedTruckMake(secondId);
    deepFreeze(startState);
		var newState = truckMakes(startState, action);
		expect(newState[0].active).to.be.true
		var secondState = truckMakes(newState, action2);
		expect(secondState[0].active).to.be.false
		expect(secondState[1].active).to.be.true
	})

});
