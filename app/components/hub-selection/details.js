import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection';
import Specs from 'components/hub-selection/details/specs';
import Description from 'components/hub-selection/details/description';
import Meta from 'components/hub-selection/details/meta';
import Spinner from 'components/global/spinner'
import {Link} from 'react-router';
import { fetchAssemblyDetails } from 'actions/assembly'
import { connect } from 'react-redux'


class Details extends Component {

	componentDidMount() {
		const { app, dispatch, params } = this.props
		dispatch(fetchAssemblyDetails(params.id))
	}
	render() {
		const {app, assembly } = this.props

		let display = <Spinner isFetching={assembly.isFetching} />
		if (!assembly.isFetching) {
			display = assembly.result.map((result, index) => {

					return (
						<div key={index}>
							<Meta result={result}/>
							<Specs result={result}/>
						</div>
					)
				})

		}
		return (
			<div className="grid-container main-content">
				<h2>Product Details</h2>

				{display}

				<Link to="/hub-selection/results" className="general-button">Return</Link>
				{/*}<Link to="/hub-selection/email" className="general-button">Email Results</Link>
				<Link to="/hub-selection/step-three" className="general-button">Find this Product</Link>*/}

			</div>
		)
	}
};

export default connect()(Details)
