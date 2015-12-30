import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import Step from 'components/hub-selection/step'
import { updateFilters, fetchAssembly } from 'actions'

class HubSelector extends Component {

	render() {
		const { dispatch, history, hub, truckMakes } = this.props;

		const childProps = {
			hub: hub,
			truckMakes: truckMakes,
			setHubState: filter => {
				dispatch(updateFilters(filter))
			},
			searchForAssembly: () => {
				console.log('Fetching');
				dispatch(fetchAssembly(hub))
			}
		}


		const childrenWithProps = React.Children.map(this.props.children,
					function(child) {
						return React.cloneElement(child, childProps);
	        });

		return (
			<div className="grid-block vertical align-center">
				<Step history={history}></Step>
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
    hub: state.hubSelector,
		truckMakes: state.truckMakes
	}
}
export default connect(select)(HubSelector)
