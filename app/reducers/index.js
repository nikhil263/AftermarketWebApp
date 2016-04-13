import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import * as constants from '../config/constants'
import _ from 'lodash'
import { assembly } from './assembly'
import { results } from './results'
import { images } from './images'
import { app } from './app'

const rootReducer = combineReducers(Object.assign({}, {
	results,
	assembly,
	images,
	app
}, {
  routing: routeReducer
}))

export default rootReducer
