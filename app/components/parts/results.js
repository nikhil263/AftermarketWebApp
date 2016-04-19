import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux'
import { pushPath } from 'redux-simple-router'
import {fetchParts} from 'actions/parts'
import { PARTTYPES } from 'config/constants'
import Part from './part'
import NoResults from '../global/no-result'
import Waiting from '../global/waiting'
import _ from 'lodash'

class Results extends Component {
	componentDidMount() {
		const {dispatch, app, params} = this.props
		// console.log(params)
		if (params.id) {
			dispatch(fetchParts(params.id))
		} else {
			dispatch(pushPath('/parts/search'));
		}

	}

	render() {
		const { parts, dispatch, images, app, history } = this.props

		if (parts.isFetching) {
			return (<Waiting />)
		}
		if (parts.AftermarketParts.length === 0) {
			return (<NoResults />)
		}



		return (
			<div className="grid-container main-content">
				<h2>Hub Components Search Results for:</h2>
				<h2 className="partsSubHead">{parts.HubAssemblyDescription} <span className="number">#{parts.HubAssemblyNumber}</span></h2>
				<div className="parts">
					<h2>Full Replacement Hub</h2>
					<table>
						<tbody>
						{PARTTYPES.map((item, index) => {
							let allowed = [115]
							if (-1 < allowed.indexOf(item.PartTypeId)) {
								let part = _.find(parts.AftermarketParts, {TypeId: item.PartTypeId})
								if (part) {
								return (
									<tr key={index}>
										<td>{item.AftermarketPartTypeName}</td>
										<td>{part.PartNumber}</td>
									</tr>
								)
								/*} else {
								return (
									<tr key={index}>
										<td>{item.AftermarketPartTypeName}</td>
										<td>N/A</td>
									</tr>
								)*/
								}
							}

						})}
						</tbody>
					</table>

					<h2>Service & Rebuild Kits</h2>
					<table>
						<tbody>
							{PARTTYPES.map((item, index) => {
								let allowed = [217, 218, 219, 221]
								if (-1 < allowed.indexOf(item.PartTypeId)) {
								let part = _.find(parts.AftermarketParts, {TypeId: item.PartTypeId})
								if (part) {
								return (
									<tr key={index}>
										<td>{item.AftermarketPartTypeName}</td>
										<td>{part.PartNumber}</td>
									</tr>
								)
								/*} else {
								return (
									<tr key={index}>
										<td>{item.AftermarketPartTypeName}</td>
										<td>N/A</td>
									</tr>
								)*/
								}
							}

						})}
						</tbody>
					</table>

					<h2>Service Parts</h2>

					<table>
						<tbody>
							{PARTTYPES.map((item, index) => {
								let allowed = [220]
								if (-1 < allowed.indexOf(item.PartTypeId)) {
								let part = _.find(parts.AftermarketParts, {TypeId: item.PartTypeId})
								if (part) {
								return (
									<tr key={index}>
										<td>{item.AftermarketPartTypeName}</td>
										<td>{part.PartNumber}</td>
									</tr>
								)
								/*} else {
								return (
									<tr key={index}>
										<td>{item.AftermarketPartTypeName}</td>
										<td>N/A</td>
									</tr>
								)*/
								}
							}

						})}
					</tbody>
				</table>

			<h2>Spindle Nut Kits</h2>
			<table>
				<tbody>
					{PARTTYPES.map((item, index) => {
						let allowed = [222, 223, 226, 227]
						if (-1 < allowed.indexOf(item.PartTypeId)) {
						let part = _.find(parts.AftermarketParts, {TypeId: item.PartTypeId})
						if (part) {
						return (
							<tr key={index}>
								<td>{item.AftermarketPartTypeName}</td>
								<td>{part.PartNumber}</td>
							</tr>
						)
						/*} else {
						return (
							<tr key={index}>
								<td>{item.AftermarketPartTypeName}</td>
								<td>N/A</td>
							</tr>
						)*/
						}
					}

				})}
			</tbody>
		</table>
		</div>
		<a href="javascript:void(0)" onClick={history.goBack.bind(this)} className="general-button">Return to search</a>
	</div>

		)
	}
};
export default connect()(Results)
