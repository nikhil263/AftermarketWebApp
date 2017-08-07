import React, { PropTypes, Component } from 'react';
export default class Disclaimer extends Component {
	render() {
		return (
			<div className="grid-frame vertical splash" id="disclaimer">
				<div className="grid-block align-center">
					<div className="grid-container">
						<div className="grid-content splash-title">
							<h2>Disclaimer</h2>
							<div className="disclaimer">
								<p>ConMet is the leading supplier of wheel end technology for commercial vehicles in North America. This app is intended to direct the distributor and/or end-user to a readily available aftermarket replacement component or wheel end assembly.</p>
								<p>Due to the variety of vehicle applications and part numbers we supply to the original equipment manufacturers, this app is not all inclusive. In some cases this app will not have a reference to a direct aftermarket replacement part number. In that instance, we will direct you to our customer service team who can assist with finding the correct service part or wheel end assembly required to get the vehicle back in service.</p>
								<p>CAUTION: As you are guided through the app, it is important that you verify your responses. Failure to do so could result in the wrong service part or hub assembly recommendation. Wheel hubs are a safety critical component and installing the wrong component or assembly on a vehicle can result in premature failure.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
};
