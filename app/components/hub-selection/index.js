import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import Step from 'components/hub-selection/step'
import { updateFilters,
				fetchAssembly,
				fetchHubs,
				updateStep,
			 	incrementStep,
				decrementStep} from 'actions'

class HubSelector extends Component {

	render() {
		const { dispatch, history, hub, truckMakes, results, app} = this.props;

		const childProps = {
			hub: hub,
			truckMakes: truckMakes,
			results: results,
			setHubState: filter => {
				dispatch(updateFilters(filter))
			},
			setStep: step => {
				dispatch(updateStep(step))
			},
			incrStep: () => {
				dispatch(incrementStep())
			},
			decrStep: () => {
				dispatch(decrementStep())
			},
			searchForAssembly: (partNumber) => {
				if (partNumber) {
					dispatch(fetchHubs(partNumber))
				} else {
					dispatch(fetchAssembly(hub))
				}

			}
		}


		const childrenWithProps = React.Children.map(this.props.children,
					function(child) {
						return React.cloneElement(child, childProps);
	        });

		return (
			<div className="grid-block vertical align-center">
				<Step history={history} step={app.step} max={hub.truckCompartmentIds === 2 ? 3 : 5} decrStep={childProps.decrStep}></Step>
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
		app: state.appState,
    hub: state.hubSelector,
		truckMakes: state.truckMakes,
		results: state.results
	}
}
export default connect(select)(HubSelector)
