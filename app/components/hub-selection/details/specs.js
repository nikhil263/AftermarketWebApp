import React, { PropTypes, Component } from 'react';
export default class extends Component {
	render() {
		const {result} = this.props
		return (
				<div className="specs">
					<h2>Product Specs</h2>
					<table>
						<tbody>
						<tr>
							<td>Material</td>
							<td>{result.Material}</td>
						</tr>
						<tr>
							<td>Axle Position</td>
							<td>{result.AxlePosition}</td>
						</tr>
						<tr>
							<td>Axle</td>
							<td>{result.Axle}</td>
						</tr>
						{/*}<tr>
							<td>Spindle Lock Configuration</td>
							<td>D FLAT</td>
						</tr>*/}
						<tr>
							<td>Assembly Type</td>
							<td>{result.HubAssemblyType}</td>
						</tr>
						<tr>
							<td>Bearing Set (Inboard)</td>
							<td>{result.BearingSetInboard}</td>
						</tr>
						<tr>
							<td>Bearing Set (Outboard)</td>
							<td>{result.BearingSetOutboard}</td>
						</tr>
						<tr>
							<td>Assembly Type</td>
							<td>{result.HubAssemblyType}</td>
						</tr>

						<tr>
							<td>Compatible Brake Type</td>
							<td>{result.BrakeType}</td>
						</tr>
						<tr>
							<td>Hub Mounting System</td>
							<td>{result.HubMountingSystem}</td>
						</tr>
						<tr>
							<td>Wheel Stud Standout (in.)</td>
							<td>{result.WheelStudStandoutInch}</td>
						</tr>
						<tr>
							<td>Wheel Material</td>
							<td>{result.WheelMaterial}</td>
						</tr>
						<tr>
							<td>Flange Offset</td>
							<td>{result.FlangeOffsetInch}</td>
						</tr>
						<tr>
							<td>Weight (lbs.)</td>
							<td>{result.WeightPound}</td>
						</tr>
						</tbody>
					</table>
				</div>

		)
	}
};
