import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection';
import Specs from 'components/hub-selection/details/specs';
import Description from 'components/hub-selection/details/description';
import Meta from 'components/hub-selection/details/meta';
import Spinner from 'components/global/spinner'
import {Link} from 'react-router';
import { fetchAssemblyDetails } from 'actions/assembly'
import { invalidateImages } from 'actions/images'
import { connect } from 'react-redux'


class Details extends Component {

	componentDidMount() {
		const { app, dispatch, params, images } = this.props
		dispatch(fetchAssemblyDetails(params.id, images))
	}
	render() {
		const {app, assembly, images, history } = this.props


		return (
			<div className="grid-container main-content">
				<h2>Product Details</h2>
					<Spinner isFetching={assembly.isFetching} />
					{assembly.result.map((r, index) => {

							return (
								<div key={index}>
									<Meta result={r} images={images} />
									<Specs result={r}/>
								</div>
							)
						})}

				<a href="javascript:void(0)" onClick={history.goBack.bind(this)} className="general-button">Return to results</a>

			</div>
		)
	}
};

export default connect()(Details)
