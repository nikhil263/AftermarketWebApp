import React, { PropTypes, Component } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux'

class NoResults extends Component {
	render(){
		return (
			<div className="grid-container main-content">
				<h1>Sorry. No results were found.</h1>
				<div className="not-found">
				<p>
					This app is not all inclusive. The part number you entered is not referenced in this database,
					please verify that you’ve entered the correct assembly number. If you get the same result,
					please click on the link below to access our more extensive engineering hub catalog or
					call <a href="tel://1-800-547-9473">1-800-547-9473</a> and speak directly to one of our customer service professionals to identify
					the replacement hub part  number (service part) you need.
				</p>


				</div>

				<a href="https://vdm.conmet.com/HubCatalog/" className="general-button">ConMet Online Parts Catalog</a>

			</div>
		)
	}
}

export default connect()(NoResults)
