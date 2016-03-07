import * as constants from '../config/constants'
import _ from 'lodash'
import fetch from 'isomorphic-fetch'
import {fetchImages} from 'actions/images'

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

export const requestHubs = (partNumber) => {
  return {
    type: constants.REQUEST_HUBS,
    partNumber: partNumber
  }
}

export const receiveHubs = (partNumber, json) => {
  // for now we need to usher the json into the following format
  // we need a part number and ID
  return dispatch => {
    let hubs = []
    if (json.Status != constants.ZERO_RESULTS) {
      // hubs = json.Results;
      const newFormat = json.Results.map( result => {
      return result.AftermarketParts.map(detail => {
            let mainImage = _.find(detail.Images, {ImageTypeId: 1})
            if (mainImage) {
              hubs.push(Object.assign(detail, {mainImageId: mainImage.ImageId}));
            } else {
              hubs.push(Object.assign(detail, {mainImageId: null}));
            }

            return Object.assign(detail, {PartNumber: detail.PartNumber})
          })
        })

    }

    dispatch({
      type: constants.RECEIVE_HUBS,
      partNumber: partNumber,
      hubs: hubs,
      status: json.Status
    })
  }

}

export const fetchHubs = (partNumber) => {
  const afterMarketHubPartType = 115
  return dispatch => {
    dispatch(requestHubs(partNumber))
    ///1/'+partNumber
    //https://apis.conmetwheelends.com/aftermarket/v1/summarydetails/~/10031065
    //https://apis.conmetwheelends.com/parts/api/v2/details/~/10031065
    return fetch(constants.APITEMP+'/aftermarketparts/'+partNumber+'/'+afterMarketHubPartType, {
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
        // console.log('API Error', err);
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
