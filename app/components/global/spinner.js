import React, { PropTypes, Component } from 'react';

export default class extends Component {
	render() {
		let {isFetching } = this.props
		return (
			<div className="spinner">
			  <div className="rect1"></div>
			  <div className="rect2"></div>
			  <div className="rect3"></div>
			  <div className="rect4"></div>
			  <div className="rect5"></div>
			</div>
		)
	}
}
