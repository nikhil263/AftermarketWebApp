import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux'
import { pushPath } from 'redux-simple-router'
import {fetchParts} from 'actions/parts'
import { PARTTYPES } from 'config/constants'
import Part from './part'
import NoResults from '../global/no-result'
import Waiting from '../global/waiting'
import _ from 'lodash'
import {Link} from 'react-router';

const FULLREPLACE = [115]
const SERVICEPARTS = [220, 5, 6, 7, 8, 101]
// const SERVICEKITS = [217, 218, 219, 221]
// const SPINDLENUTS = [222, 223, 226, 227]
const SERVICEKITS = [217, 218, 219, 221, 222, 223, 226, 227,203]
const SPINDLENUTS = []

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

	showHeader(allowed = []) {
		const { parts } = this.props
		let found = false;
		parts.AftermarketParts.map((item, index) => {
			console.log(allowed, item)
			 if (-1 !== allowed.indexOf(item.TypeId)) {
				 found  = true;
			 }
		})
		return found;
	}

	renderTable(viewArray = [], item) {
		if (!viewArray) {
			return null
		}

		let view = viewArray.map((part, index) =>{
			let appendStr = '';
			if (item.Usages && item.Usages.length > 0) {
				appendStr = item.Usages[part.UsageId]
			}

			if (viewArray.length > 1 && part.TypeId === 115) {
				//if (part.Description.indexOf('PreSet') > -1) {
					return (
						<tr key={index}>
							<td><Link to={'/hub-selection/details/'+part.PartNumber} >{item.AftermarketPartTypeName+appendStr}</Link></td>
							<td>{part.PartNumber}</td>
						</tr>
					)
				//}
			} else {
				if (part.TypeId === 115) {
					return (
						<tr key={index}>
							<td><Link to={'/hub-selection/details/'+part.PartNumber} >{item.AftermarketPartTypeName+appendStr}</Link></td>
							<td>{part.PartNumber}</td>
						</tr>
					)
				} else {
					return (
						<tr key={index}>
							<td>{item.AftermarketPartTypeName+appendStr}</td>
							<td>{part.PartNumber}</td>
						</tr>
					)
				}

			}


		})

		return view
	}

	render() {
		const { parts, dispatch, images, app, history } = this.props

		if (parts.isFetching) {
			return (<Waiting />)
		}

		if (parts.AftermarketParts.length === 0) {
			return (<NoResults />)
		}

		let replacementHeader, serviceKitHeader, servicePartHeader, spindleNutsHeader = null
		parts.AftermarketParts.map((item, index) => {

			 if (-1 !== FULLREPLACE.indexOf(item.TypeId)) {
				 replacementHeader = <h2>Full Replacement Hub</h2>
			 }

			 if (-1 !== SERVICEKITS.indexOf(item.TypeId)) {
				 serviceKitHeader = <h2>Service & Rebuild Kits</h2>
			 }

			 if (-1 !== SERVICEPARTS.indexOf(item.TypeId)) {
				 servicePartHeader = <h2>Service Parts</h2>
			 }

			 if (-1 !== SPINDLENUTS.indexOf(item.TypeId)) {
				 spindleNutsHeader = <h2>Spindle Nut Kits</h2>
			 }
		})
		return (
			<div className="grid-container main-content">
				<h2>Hub Components Search Results for:</h2>
				<h2 className="partsSubHead">{parts.HubAssemblyDescription} <span className="number">{parts.HubAssemblyNumber}</span></h2>
				<div className="parts">
					{replacementHeader}
					<table>
						<tbody>
						{PARTTYPES.map((item, index) => {
							if (-1 < FULLREPLACE.indexOf(item.PartTypeId)) {
								console.log('aftermarket parts', parts.AftermarketParts)
								let filtered = _.filter(parts.AftermarketParts, {TypeId: item.PartTypeId})
                                filtered = filtered.sort(function(a,b){
                                	return a.Ranking > b.Ranking;
								});
								//Return only the first item
								if(filtered.length) {
                                    return this.renderTable([filtered.shift()], item)
                                }
							}

						})}
						</tbody>
					</table>

					{serviceKitHeader}


					<table>
						<tbody>
							{PARTTYPES.map((item, index) => {
								if (-1 < SERVICEKITS.indexOf(item.PartTypeId)) {
									let filtered = _.filter(parts.AftermarketParts, {TypeId: item.PartTypeId});
                                    if(filtered.length) {
                                        return this.renderTable(filtered, item)
                                    }
								}

						})}
						</tbody>
					</table>

					{servicePartHeader}


					<table>
						<tbody>
							{PARTTYPES.map((item, index) => {
								if (-1 < SERVICEPARTS.indexOf(item.PartTypeId)) {
									let filtered = _.filter(parts.AftermarketParts, {TypeId: item.PartTypeId});
                                    if(filtered.length) {
                                        return this.renderTable(filtered, item)
                                    }
								}

						})}
					</tbody>
				</table>

				{spindleNutsHeader}

			<table>
				<tbody>
					{PARTTYPES.map((item, index) => {
						if (-1 < SPINDLENUTS.indexOf(item.PartTypeId)) {
							let filtered = _.filter(parts.AftermarketParts, {TypeId: item.PartTypeId});
                            if(filtered.length) {
                                return this.renderTable(filtered, item)
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
