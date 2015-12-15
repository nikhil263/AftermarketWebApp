import React, { PropTypes, Component } from 'react';
export default class extends Component {
	render() {
		return (
				<div className="specs">
					<h2>Product Specs</h2>
					<table>
						<tbody>
						<tr>
							<td>Material</td>
							<td>Aluminum</td>
						</tr>
						<tr>
							<td>Axle Position</td>
							<td>Front</td>
						</tr>
						<tr>
							<td>Axle Spindle</td>
							<td>D Flat</td>
						</tr>
						<tr>
							<td>Spindle Lock Configuration</td>
							<td>D FLAT</td>
						</tr>
						<tr>
							<td>Assembly Type</td>
							<td>PreSet Plus</td>
						</tr>
						<tr>
							<td>Compatible Brake Type</td>
							<td>Drum</td>
						</tr>
						<tr>
							<td>Hub Mounting System</td>
							<td>HP10</td>
						</tr>
						<tr>
							<td>Wheel Stud Standout (in.)</td>
							<td>2.92</td>
						</tr>
						<tr>
							<td>Wheel Material</td>
							<td>Any</td>
						</tr>
						<tr>
							<td>Flange Offset</td>
							<td>5.06</td>
						</tr>
						<tr>
							<td>Weight (lbs.)</td>
							<td>38.26</td>
						</tr>
						</tbody>
					</table>
				</div>

		)
	}
};
