import {
  RECIEVE_ASSEMBLY_DETAILS,
  REQUEST_ASSEMBLY_DETAILS,
  INVALIDATE_ASSEMBLY_DETAILS,
  RECIEVE_IMAGES,
  INVALIDATE_IMAGES,
  INCACHE_IMAGE, COMPARE_RECEIVE_ASSEMBLIES, COMPARE_REQUEST_ASSEMBLIES
} from '../config/constants';

const defaultState = {
  result: [],
  isFetching: false,
  needsFetch: false,
  compare: {
    results: [],
    differentProperties: [],
  },
};

export const assembly = (state = defaultState, action) => {
  const newResult = Object.assign([], state.result);
  switch (action.type) {
    case RECIEVE_ASSEMBLY_DETAILS:
      return Object.assign({}, state, {result: action.results, id: action.id});
    case REQUEST_ASSEMBLY_DETAILS:
      return Object.assign({}, state, {isFetching: false});
    case INVALIDATE_ASSEMBLY_DETAILS:
      return Object.assign({}, state, {isFetching: true, needsFetch: false});
    case RECIEVE_IMAGES:
    case INCACHE_IMAGE:
      if (newResult.length > 0) {
        newResult[0].image = action.images;
      }
      return Object.assign({}, state, {result: newResult});
    case INVALIDATE_IMAGES:
      if (newResult.length > 0) {
        newResult[0].image = [];
      }
      return Object.assign({}, state, {result: newResult});
    case COMPARE_REQUEST_ASSEMBLIES:
      return Object.assign({}, state, {isFetching: true});
    case COMPARE_RECEIVE_ASSEMBLIES: {
      const {Results} = action.payload;
      const differentProperties = [];

      if (Results && Results.length === 2) {
        Results.forEach((item, index) => {
          const keys = Object.keys(item);

          if (!index && item && Results[index + 1]) {
            const nextItem = Results[index + 1];

            keys.forEach(key => {
              if (key !== 'Images' && item[key] !== nextItem[key]) {
                differentProperties.push(key);
              }
            })
          }
        });
        return {...state, compare: {...state.compare, results: Results, differentProperties}, isFetching: false};
      }

      return Object.assign({}, state, {isFetching: false});
    }
    default:
      return state
  }
}
