import React, { PropTypes, Component, Children } from 'react';
import { Router, Route, Link, IndexRoute } from 'react-router';
import {fetchCategories} from 'actions/categories'
import {connect} from 'react-redux'


import Navigation from 'components/navigation'
import Footer from 'components/footer'

class App extends Component {

	static contextTypes = {
		store: PropTypes.object,
  	history: PropTypes.object
  };

	updateAppState() {
		//update the local history with the new history
	}

	componentDidMount() {
		// console.log('Loading App');
		const { dispatch } = this.props
		dispatch(fetchCategories())
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
				<div className="grid-main">
					{childrenWithProps}
					<Footer />
				</div>


			</div>
			)
	}
};
export default connect()(App)
