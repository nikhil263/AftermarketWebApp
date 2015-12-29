import React, { PropTypes, Component } from 'react';
import { pushPath } from 'redux-simple-router'

export default class extends Component {

	constructor(props) {
		super(props);
		this.props = props;
	}

	linkTo() {
		const {store, to, className} = this.props;
		store.dispatch(pushPath(to, store.getState()))
	}

	render() {
		const {store, to, className} = this.props;
		return (
			<a href="javascript:void(0)" onClick={this.linkTo.bind(this)} className={className}>{this.props.children}</a>
		)
	}
}
