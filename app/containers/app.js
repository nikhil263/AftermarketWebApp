import React, { PropTypes, Component, Children } from 'react';
import { Router, Route, Link, IndexRoute } from 'react-router';


import Navigation from 'components/navigation'

export default class App extends Component {

	static contextTypes = {
		store: PropTypes.object,
  	history: PropTypes.object
  };

	updateAppState() {
		//update the local history with the new history
	}

	render() {
		const { store, history} = this.context;
		const childProps = {
			store: store,
			updateAppState: this.updateAppState
		}
		const childrenWithProps = React.Children.map(this.props.children, function(child) {
	            return React.cloneElement(child, childProps);
	        });

		return (
			<div className="grid-frame vertical">
			<Navigation />
			{childrenWithProps}
			</div>
			)
	}
};
