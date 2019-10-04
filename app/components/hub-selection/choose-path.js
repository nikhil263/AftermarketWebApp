import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection'
import {Link} from 'react-router';
import { updateFilters } from 'actions'
import { fetchCategories } from 'actions/categories'
import { fetchFilters } from 'actions/filters'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'

class ChoosePath extends Component {
	static contextTypes = {
		store: PropTypes.object,
		history: PropTypes.object
	};

	componentDidMount() {
		const { app, dispatch } = this.props;

	}

	updateState(obj) {
		const {store} = this.context;
		store.dispatch(updateFilters(obj))
	}

	handleClick(path) {
		const { app, dispatch, incrStep } = this.props;
		dispatch(pushPath(path))
	}

	render() {

		return (
			<div className="grid-container main-content">
				<h2>Do you know your hub assembly number?</h2>
				<div className="conmet-button" >
					<button onClick={this.handleClick.bind(this, '/hub-selection/search')} className="yes-no-button">
						<em>Yes</em>I know the hub assembly number.
					</button>
				</div>
				<div className="conmet-button">
					<button onClick={this.handleClick.bind(this, '/hub-selection/find-assembly')} className="yes-no-button">
						<em>No</em>Help me find the assembly number.
					</button>
				</div>
				<div className="conmet-button">
					<button onClick={this.handleClick.bind(this, '/hub-selection/truck-type')} className="yes-no-button">
						<em>No</em>Proceed without the number.
					</button>
				</div>
                <div className="conmet-button">
                    <button onClick={this.handleClick.bind(this, '/hub-selection/compare-hub')} className="yes-no-button">
                        <em>Yes</em>I want to compare two assemblies.
                    </button>
                </div>
			</div>
		)
	}
};

export default connect()(ChoosePath)
