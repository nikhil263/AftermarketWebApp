import React, {Component} from 'react'
import Spinner from './spinner'

export default class Waiting extends Component {
	render() {
		return (
			<div className="grid-container main-content">
				<h2>Receiving results</h2>
				<Spinner isFetching={true} />
			</div>
		)
	}
}
