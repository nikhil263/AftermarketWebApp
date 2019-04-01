import fetch from "isomorphic-fetch";
import * as constants from "config/constants";


export const fetchLongStudApi = (filters) =>{
  return fetch(constants.API+'/hubassembly/filtervalues/tmake?'+filters, {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': constants.V2KEY
    }
  }).then(response => response.json());
};
