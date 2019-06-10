import React, { PropTypes, Component } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux'

class NoResults extends Component {
	render(){
		return (
			<div className="grid-container main-content">
				<h1>No results were found.</h1>
				<div className="not-found">
				<p>
					The part number you entered is not referenced in this database,
					please verify that you’ve entered the correct assembly number. If you get the same result,
					please call <a href="tel://1-800-547-9473">1-800-547-9473</a> to speak to a Customer Service Representative.
				</p>


				</div>

				{/*<a href="https://hubcatalog.conmet.com/" className="general-button">ConMet Online Parts Catalog</a>*/}

			</div>
		)
	}
}

export default connect()(NoResults)
