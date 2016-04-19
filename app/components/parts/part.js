import React, { PropTypes, Component, Image } from 'react';
import { pushPath } from 'redux-simple-router'
import { connect } from 'react-redux'
import {Link} from 'react-router';
import { PARTTYPES } from 'config/constants'
import _ from 'lodash'



class Result extends Component {
	constructor(props) {
		super(props)
		this.itemDetails = {};
	}

	render () {
	 let { idx, total, item, dispatch, partId} = this.props

	return (
 	 <div className="result">
		<div className="details">
				<h2>Parts for #{partId}</h2>
		</div>
	</div>
	 )
 	}
}

export default connect()(Result);
