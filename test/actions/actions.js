import {expect} from 'chai'
import * as actions from '../../app/actions'
import {
  UPDATE_FILTER,
  UPDATE_LAST_PAGE,
  SET_TRUCK_MAKE,
  REQUEST_ASSEMBLIES,
  RECEIVE_ASSEMBLIES,
  INVALIDATE_ASSEMBLIES,
  RECEIVE_HUBS,
  REQUEST_HUBS,
  INVALIDATE_HUBS,
  SHOW_PREVIOUS_RESULT,
  SHOW_NEXT_RESULT,
  SHOW_RESULT_AT_IDX,
  RESET_FILTER}
  from '../../app/config/constants'


const hubFilter = {
  aftermarketPartTypeIds: 1,
  axleNameIds: 2,
  axlePositionIds: 2,
  brakeTypeIds: 1,
  dutyRatingIds: 1,
  filterId: '~',
  grossAxleWeightRatingRangeIds: '~',
  partNumbers: '~',
  searchText: '',
  truckCompartmentIds: 1,
  truckMakeIds: 1,
  wheelTypeStudLengthIds: '~'
}

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

  it('should create an action to update last page', () => {
		const path = 'hub-selection/step-two'
		const expectedAction = {
      type: UPDATE_LAST_PAGE,
      lastPath: path
    }
		expect(actions.updateLastPage(path)).to.eql(expectedAction)
  })

  it('should create an action to set selected truck make', () => {
		const truckMakeId = 1;
		const expectedAction = {
      type: SET_TRUCK_MAKE,
      id: truckMakeId
    }
		expect(actions.setSelectedTruckMake(truckMakeId)).to.eql(expectedAction)
  })

  it('should create an action to request assemblies', () => {
    const expectedAction = {
      type: REQUEST_ASSEMBLIES,
      hub: hubFilter
    }
    expect(actions.requestAssembly(hubFilter)).to.eql(expectedAction)
  })

  it('should create an action to request hubs', () => {
    const partNumber = 11111
    const expectedAction = {
      type: REQUEST_HUBS,
      partNumber: partNumber
    }
    expect(actions.requestHubs(partNumber)).to.eql(expectedAction)
  })

  it('should create an action to receive hubs', () => {
    const partNumber = 11111
    const json = {
      'Status':'OK',
      'Results':[
        {
          'PartNumber':'10082207',
          'AftermarketPartNumber':'10082207',
          'Description':'ASSY PRESET AFMKT PREMIUM FF FR HP10 ABS',
          'AftermarketPartType':'Complete Hub Assembly',
          'HubCastingMaterialType':'Aluminum',
          'HubAssemblyType':'PreSet Hub Assembly (Aftermarket)'
        }
      ]
    }
    const expectedAction = {
      type: RECEIVE_HUBS,
      partNumber: partNumber,
      hubs: [{
        'PartNumber':'10082207',
        'AftermarketPartNumber':'10082207',
        'Description':'ASSY PRESET AFMKT PREMIUM FF FR HP10 ABS',
        'AftermarketPartType':'Complete Hub Assembly',
        'HubCastingMaterialType':'Aluminum',
        'HubAssemblyType':'PreSet Hub Assembly (Aftermarket)'
      }],
      status: json.Status
    }
    expect(actions.receiveHubs(partNumber, json)).to.eql(expectedAction)
  })

  it('should create an action to receieve assemblies', () => {
    const json = {
      Status: 'OK',
      Results: [{
      OemHubassemblyNumber: '10031065',
      AftermarketPartdetails: [{
        AfterMarketPartNumber: '10082207',
        Description: 'ASSY PRESET AFMKT PREMIUM FF FR HP10 ABS',
        AfterMarketPartType: 'Complete Hub Assembly'
      }]
    }]}
    const dateNow = Date.now()
    const expectedAction = {
      type: RECEIVE_ASSEMBLIES,
      hub: hubFilter,
      assemblies: json.Results,
      receivedAt: dateNow,
      status: json.Status
    }
    expect(actions.receiveAssembly(hubFilter, json, dateNow)).to.eql(expectedAction)
  })

  it('should return an empty array if there is a status of ZERO_RESULTS', () => {
    const json = {Status: 'ZERO_RESULTS' }
    const dateNow = Date.now()
    const expectedAction = {
      type: RECEIVE_ASSEMBLIES,
      hub: hubFilter,
      assemblies: [],
      receivedAt: dateNow,
      status: json.Status
    }
    expect(actions.receiveAssembly(hubFilter, json, dateNow)).to.eql(expectedAction)
  })

  it('should create an action to invalidate assemblies', () => {
    const expectedAction = {
      type: INVALIDATE_ASSEMBLIES
    }
    expect(actions.invalidateAssembly()).to.eql(expectedAction);
  })

  it('should create an action to invalidate hubs', () => {
    const expectedAction = {
      type: INVALIDATE_HUBS
    }
    expect(actions.invalidateHubs()).to.eql(expectedAction);
  })

  it('should create an action to show previous result', () => {

    const expectedAction = {
      type: SHOW_PREVIOUS_RESULT
    }
    expect(actions.showPreviousResult()).to.eql(expectedAction)
  })

  it('should create an action to show next result', () => {

    const expectedAction = {
      type: SHOW_NEXT_RESULT
    }
    expect(actions.showNextResult()).to.eql(expectedAction)
  })

  it('should create an action to show next result', () => {
    const idx = 2;
    const expectedAction = {
      type: SHOW_RESULT_AT_IDX,
      idx: idx
    }
    expect(actions.showResultAtIndex(idx)).to.eql(expectedAction)
  })

  it('should create and action to reset filter state and invalidate results', () => {
    const expectedAction = {
      type: RESET_FILTER
    }
    expect(actions.resetFilters()).to.eql(expectedAction)
  })
})
