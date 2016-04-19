import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import Step from 'components/hub-selection/step'
import { fetchParts } from 'actions/parts'
import { pushPath } from 'redux-simple-router'

class Parts extends Component {
	render() {
		const { dispatch, history, app, params, images, parts} = this.props;
		const childProps = {
			params,
			app,
			images,
			parts,
			searchForParts: (hubId) => {
				dispatch(fetchParts(hubId))
			},
			goBack: () => {
				dispatch(pushPath('/hub-selection'))
			}

		}


		const childrenWithProps = React.Children.map(this.props.children,
					function(child) {
						return React.cloneElement(child, childProps);
	        });
		const backClick = childProps.goBack.bind(this, app);
		return (

			<div className="grid-block vertical align-center">

				<Step history={history} dispatch={dispatch} app={app} onClick={backClick}></Step>
				<div className="grid-content">
					<div className="grid-container main-content">
					 {childrenWithProps}
					</div>
				</div>
			</div>
		)
	}
};

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
  return {
		app: state.app,
		parts: state.parts,
		images: state.images
	}
}
export default connect(select)(Parts)
