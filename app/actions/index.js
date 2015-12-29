import * as constants from '../config/constants'
import _ from 'lodash'


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

export function fetchAssembly(assemblyNumber) {

}

export function requestAssembly(assemblyNumber) {

}

export function receiveAssembly(assemblyNumber, json) {

}

export function fetchParts(partNumber) {
  return dispatch => {
    dispatch(requestPosts(reddit))
    return fetch(`http://www.reddit.com/r/${reddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(reddit, json)))
  }
}

export function requestParts(partNumber) {

}

export function recieveParts(partNumber, json) {

}

export function fetchDetails(assemblyNumber) {

}

export function requestDetails(assemblyNumber) {

}

export function receiveDetails(assemblyNumber, json) {

}
//
// function shouldFetchPosts(state, reddit) {
//   const posts = state.postsByReddit[reddit]
//   if (!posts) {
//     return true
//   } else if (posts.isFetching) {
//     return false
//   } else {
//     return posts.didInvalidate
//   }
// }
//
// export function fetchPostsIfNeeded(reddit) {
//   return (dispatch, getState) => {
//     if (shouldFetchPosts(getState(), reddit)) {
//       return dispatch(fetchPosts(reddit))
//     }
//   }
// }
