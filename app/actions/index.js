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


export function requestAssembly(hub) {
  return {
    type: constants.REQUEST_ASSEMBLIES,
    hub: hub
  }
}

export function receiveAssembly(hub, json, date = Date.now()) {
  return {
    type: constants.RECEIVE_ASSEMBLIES,
    hub: hub,
    assemblies: json,
    receivedAt: date
  }
}

export function fetchAssembly(hub) {
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
    let searchURL = searchArr.join('/');
    cons
    return fetch('https://aftermarketapi.conmetwheelends.com/filters/api/v1/filter/1/~/'+searchURL, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': constants.SUBSCRIPTION_KEY
      }
    })
    .then(response => response.json())
    .then(json => dispatch(receiveAssembly(searchURL, json)))
  }
}


export function requestHubs(partNumber) {
  return {
    type: constants.REQUEST_HUBS,
    partNumber: partNumber
  }
}

export function receiveHubs(partNumber, json) {
  return {
    type: constants.RECEIVE_HUBS,
    partNumber: partNumber,
    hubs: json
  }
}

export function fetchHubs(partNumber) {
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

export function fetchDetails(assemblyNumber) {

}

export function requestDetails(assemblyNumber) {

}

export function receiveDetails(assemblyNumber, json) {

}
