import React, { PropTypes, Component } from 'react';
export default class extends Component {
	render() {
		const {result,parts} = this.props;
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
							<td>Bearing {result.BearingNumbersType} (Inboard)</td>
							<td>{result.BearingNumberInboard}</td>
						</tr>
						<tr>
							<td>Bearing {result.BearingNumbersType} (Outboard)</td>
							<td>{result.BearingNumberOutboard}</td>
						</tr>
						{/*}<tr>
							<td>Assembly Type</td>
							<td>{result.HubAssemblyType}</td>
						</tr>*/}

						<tr>
							<td>Compatible Brake Type</td>
							<td>{result.BrakeType}</td>
						</tr>
						{
							parts['AftermarketParts'] && parts['AftermarketParts'].length ?
							<tr><td>Replacement Rotor Kit</td><td>{parts["AftermarketParts"][0]["PartNumber"]}</td></tr> : null
						}
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
							<td>Flange Offset (in.)</td>
							<td>{result.FlangeOffsetInch}</td>
						</tr>
						<tr>
							<td>Weight (lbs.)</td>
							<td>{result.WeightPound}</td>
						</tr>
						{
                            result.ConventionalHubNumber ? (
								<tr>
									<td>Conventional Hub Option</td>
									<td>{result.ConventionalHubNumber}</td>
								</tr>
							) : null
						}
						</tbody>
					</table>
				</div>

		)
	}
};
