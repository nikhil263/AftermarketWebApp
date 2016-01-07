import * as constants from '../config/constants'
import _ from 'lodash'
import fetch from 'isomorphic-fetch'


export const updateFilters = (obj) => {
  return Object.assign({type: constants.UPDATE_FILTER }, {update: obj});
}

export const resetFilters = (obj) => {
  return updateFilters(obj)
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
  return {
    type: constants.RECEIVE_ASSEMBLIES,
    hub: hub,
    assemblies: json,
    receivedAt: date
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
    let url = 'https://aftermarketapi.conmetwheelends.com/filters/api/v1/filter/0/~/'+searchParams;
    return fetch(url, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': constants.SUBSCRIPTION_KEY
      }
    })
    .then(response => response.json())
    .then(json => dispatch(receiveAssembly(hub, json)))
  }
}


export const requestHubs = (partNumber) => {
  return {
    type: constants.REQUEST_HUBS,
    partNumber: partNumber
  }
}

export const receiveHubs = (partNumber, json) => {
  return {
    type: constants.RECEIVE_HUBS,
    partNumber: partNumber,
    hubs: json
  }
}

export const fetchHubs = (partNumber) => {
  return dispatch => {
    dispatch(requestHubs(partNumber))
    return fetch('https://aftermarketapi.conmetwheelends.com/filters/api/v1/aftermarketpart/1/'+partNumber, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': constants.SUBSCRIPTION_KEY
      }
    })
    .then(response => response.json())
    .then(json => dispatch(receiveHubs(partNumber, json)))
  }
}

export const fetchDetails = (assemblyNumber) => {

}

export const requestDetails = (assemblyNumber) => {

}

export const receiveDetails = (assemblyNumber, json) => {

}
