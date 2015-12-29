import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';


const finalCreateStore = compose(
  // Middleware you want to use in production:
  applyMiddleware(routeReducer),
  // Other store enhancers if you use any
)(createStore);

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
};
