import React, { PropTypes, Component } from 'react';

export default class extends Component {
	render() {
		let {isFetching } = this.props
		if (isFetching) {
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
			return (<div></div>);
	}
}
