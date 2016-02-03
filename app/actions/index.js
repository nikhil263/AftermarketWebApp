import * as constants from '../config/constants'
import _ from 'lodash'
import fetch from 'isomorphic-fetch'

export const updateFilters = (obj) => {
  return Object.assign({type: constants.UPDATE_FILTER }, {update: obj});
}

export const resetFilters = (obj) => {
  return {
      type: constants.RESET_FILTER
    }
}

export const resetState = (obj) => {
  return dispatch => {
    dispatch(invalidateHubs())
    dispatch(invalidateAssembly())
    dispatch(resetFilters())
  }

}

export const materialFilter = (filter) => {
  return {
    type: constants.SET_MATERIAL_FILTER,
    filter: filter
  }
}

export const updateStep = (step) => {
  return {
    type: constants.UPDATE_STEP,
    step: step
  }
}

export const incrementStep = () => {
  return {
    type: constants.INCREMENT_STEP
  }
}

export const decrementStep = () => {
  return {
    type: constants.DECREMENT_STEP
  }
}

export const updateLastPage = (path) => {
  return {
    type: constants.UPDATE_LAST_PAGE,
    lastPath: path
  }
}

export const setSelectedTruckMake = (id) => {
  return {
    type: constants.SET_TRUCK_MAKE,
    id: id
  }
}

export const showNextResult = () => {
  return {
    type: constants.SHOW_NEXT_RESULT
  }
}
export const showPreviousResult = () => {
  return {
    type: constants.SHOW_PREVIOUS_RESULT
  }
}

export const showResultAtIndex = (idx) => {
  return {
    type: constants.SHOW_RESULT_AT_IDX,
    idx: idx
  }
}

export const requestAssembly = (hub) => {
  return {
    type: constants.REQUEST_ASSEMBLIES,
    hub: hub
  }
}

export const receiveAssembly = (hub, json, date = Date.now()) => {

  let assemblies = []
  if (json.Status != 'ZERO_RESULTS') {
    assemblies = json.Results;
  }
  return {
    type: constants.RECEIVE_ASSEMBLIES,
    hub: hub,
    assemblies: assemblies,
    receivedAt: date,
    status: json.Status
  }
}

export const fetchAssembly = (hub) => {
  return dispatch => {
    dispatch(requestAssembly(hub))
    let searchArr = [
      hub.aftermarketPartTypeIds,
      hub.truckCompartmentIds,
      hub.dutyRatingIds,
      hub.brakeTypeIds,
      hub.truckMakeIds,
      hub.axlePositionIds,
      hub.axleNameIds,
      hub.grossAxleWeightRatingRangeIds,
      hub.wheelTypeStudLengthIds
    ]
    let searchParams = searchArr.join('/');
    let url = 'https://apis.conmetwheelends.com/aftermarket/v2/filter/values/0/~/'+searchParams;
    return fetch(url, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': constants.V2KEY
      }
    })
    .then(
      response => response.json(),
      err => {
        console.log('API Error', err);
      }
    )
    .then(json => dispatch(receiveAssembly(hub, json)))
  }
}

export const invalidateAssembly = () => {
  return {
    type: constants.INVALIDATE_ASSEMBLIES,
  }
}

export const requestHubs = (partNumber) => {
  return {
    type: constants.REQUEST_HUBS,
    partNumber: partNumber
  }
}

export const receiveHubs = (partNumber, json) => {
  // for now we need to usher the json into the following format
  // we need a part number and ID
  let hubs = []
  if (json.Status != 'ZERO_RESULTS') {
    const newFormat = json.Results.map( result => {
      return Object.assign(result, {
        AftermarketPartDetailSummaries: result.AftermarketPartdetails.map(detail => {
          hubs.push(Object.assign(detail, {PartNumber: detail.AftermarketPartNumber}));
          return Object.assign(detail, {PartNumber: detail.AftermarketPartNumber})
        })
      })
    })
  }

  return {
    type: constants.RECEIVE_HUBS,
    partNumber: partNumber,
    hubs: hubs,
    status: json.Status
  }
}

export const fetchHubs = (partNumber) => {
  return dispatch => {
    dispatch(requestHubs(partNumber))
    ///1/'+partNumber
    //https://apis.conmetwheelends.com/aftermarket/v1/summarydetails/~/10031065
    //https://apis.conmetwheelends.com/parts/api/v2/details/~/10031065
    return fetch('https://apis.conmetwheelends.com/aftermarket/v2/details/summary/1/'+partNumber, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': constants.V2KEY
      }
    })
    .then(
      response => response.json(),
      err => {
        console.log('API Error', err);
    })
    .then(json => dispatch(receiveHubs(partNumber, json)))
  }
}

export const invalidateHubs = () => {
  return {
    type: constants.INVALIDATE_HUBS,
  }
}

export const fetchDetails = (assemblyNumber) => {

}

export const requestDetails = (assemblyNumber) => {

}

export const receiveDetails = (assemblyNumber, json) => {

}
