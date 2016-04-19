import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'

class HelpDetail extends Component {
	render() {
		return (
			<div>
				<h1>IDENTIFYING CONMET HUB ASSEMBLIES</h1>

				<p>Identifying your hub assembly is important for many reasons. It will enable you to properly service the hub assembly and purchase the appropriate replacement parts if needed. Plus, if a warranty issue arises, youʼll then be able to provide details on all aspects of the ConMet hub. This section is devoted to finding and understanding the different identification numbers associated with ConMet hubs.</p>

		<h3>Vehicle Identification Number (VIN)</h3>

		<p>The quickest and easiest method of identifying your hub assembly is to note the vehicle identification number (VIN) and call the truck dealership. The dealership can then tell you what hubs were installed on your vehicle. If this is not possible, there is a variety of identification numbers located on a ConMet hub assembly.</p>

		<h3>Casting Number</h3>

		<p>This number is physically cast into the hub and appears in large characters usually on the back side of the mounting flange near the stud head (see figure 10).</p>

		<div className="figure">
			<img src={require('../../images/figure10.png')} alt="Figure 10"/>
		<small>Casting Number on the Back Side of the Mounting Flange<br />Figure 10</small>
		</div>

		<h3>Machining Assembly Number</h3>

		<p>This number is stamped on one of the following:</p>
		<ul>
			<li>Mounting flange face (see figure 11)</li>
			<li>Diameter of the mounting flange (see figure 12)</li>
			<li>Back side of the mounting flange (see figure 13)</li>
			<li>Barrel of the hub (see figure 14)</li>
		</ul>

		<p>The machining number represents the way the hub is machined (e.g., hub pilot vs. ball seat, 8.78&#8243; vs. 8.53&#8243; vs. 9&#8243; brake drum pilot diameter).</p>

			<div className="figure">
				<img src={require('../../images/figure11.png')} alt="Figure 11"/>
			<small>Mounting Flange Face<br />Figure 11</small>
			</div>

			<div className="figure">
				<img src={require('../../images/figure12.png')} alt="Figure 12"/>
			<small>Mounting Flange Diameter<br />Figure 12</small>
			</div>

			<div className="figure">
				<img src={require('../../images/figure13.png')} alt="Figure 13"/>
			<small>Mounting Flange Backface<br />Figure 13</small>
			</div>

			<div className="figure">
				<img src={require('../../images/figure14.png')} alt="Figure 14"/>
			<small>Barrel of Hub<br />Figure 14</small>
			</div>


		<h3>Final Hub Assembly Number</h3>

		<p>This number is stamped on one of the following: </p>
		<ul>
			<li>Mounting flange face (see figure 11) </li>
			<li>Diameter of the mounting flange (see figure 12) </li>
			<li>Back side of the mounting flange (see figure 13)</li>
		</ul>

		<p>The final hub assembly number identifies the hub assembly, hub machining, studs, bearings, spacer, seal and ABS ring.</p>

		<h3>Julian Date</h3>

		<p>Both the machining and the final assembly have Julian dates stamped into the hub assembly in the same location as the assembly numbers (see figures 11, 12, 13 and 14). A Julian date appears as the day of the year plus the last two digits of the calendar year (e.g., July 4 2008 would appear as 18508). This number provides the date when the hub was machined and assembled at the factory and may be used for warranty purposes.</p>

		</div>
		)
	}
};

export default connect()(HelpDetail);
