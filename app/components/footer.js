import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux'


class Footer extends Component {

	render() {
		return (
			<div style={{textAlign:'center'}}>
                <p className="terms-and-conditions">In using this application you are acknowledging that you have read and understand ConMet's <a href={`${window.location.origin}/ConMet-Terms-And-Conditions.pdf`} target='_blank'>terms and conditions</a></p>
			</div>

		);
	}
}
export default connect()(Footer)
