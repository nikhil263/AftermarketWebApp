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

  return {
    type: constants.RECEIVE_HUBS,
    partNumber: partNumber,
    hubs: hubs,
    status: json.Status
  }


}

export const fetchHubs = (partNumber) => {
  const afterMarketHubPartType = 115
  return dispatch => {
    dispatch(requestHubs(partNumber))
    ///1/'+partNumber
    //https://apis.conmetwheelends.com/aftermarket/v1/summarydetails/~/10031065
    //https://apis.conmetwheelends.com/parts/api/v2/details/~/10031065

    return fetch(constants.API+'/aftermarketparts?hanum='+partNumber+'&party='+afterMarketHubPartType, {
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

export const fetchHubAssemblyNumber = (term) => {
    return dispatch => {
        return fetch(constants.API+'/hubassemblynumbers/withaftermarkethubassemblies/'+term, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': constants.V2KEY
            }
        }).then(
            response => response.json(),
            err => {
                // console.log('API Error', err);
            })
            .then(json => {
                dispatch({
                    type: constants.ASSEMBLY_NUMBER_DATA,
                    assemblyNumber: json,
                })
            })
    }
};

export const fetchHubAssemblyFilters = (id) =>{
    return dispatch => {
        return fetch(constants.API+'/aftermarkethubassemblyfilters?chaid='+id, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': constants.V2KEY
            }
        }).then(
            response => response.json(),
            err => {
                // console.log('API Error', err);
            })
            .then(json => {
                dispatch({
                    type: constants.HUB_ASSEMBLY_FILTERS,
                    filters: json,
                })
            })
    }
};

export const fetchFilterValues = (filtername,filters) =>{
    return dispatch => {
        return fetch(constants.API+"/hubassembly/filtervalues/"+filtername+"?"+filters, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': constants.V2KEY
            }
        }).then(
            response => response.json(),
            err => {
                // console.log('API Error', err);
            })
            .then(json => {
                dispatch({
                    type: constants.HUB_ASSEMBLY_FILTER_VALUE,
                    filters: json,
                })
            })
    }
};

export const fetchHubsCrossApi = (filters) =>{
    return dispatch => {
        return fetch(constants.API+'/hubassembly/filtervalues/hanum?'+filters, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': constants.V2KEY
            }
        }).then(
            response => response.json(),
            err => {
                // console.log('API Error', err);
            })
            .then(json => {
                dispatch({
                    type: constants.RECEIVE_HUBS_CROSS_API,
                    filters: json,
                })
            })
    }
};

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
