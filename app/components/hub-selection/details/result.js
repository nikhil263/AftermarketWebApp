import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection';
import { pushPath } from 'redux-simple-router'
import { connect } from 'react-redux'
import {showPreviousResult, showNextResult} from 'actions'
import { AFTERMARKET_DETAILS } from 'config/constants'
import _ from 'lodash'
import Spinner from 'components/global/spinner'

class Result extends Component {
	constructor(props) {
		super(props)
		this.itemDetails = {};
	}

	showPrevious() {
		const {dispatch} = this.props;
		dispatch(showPreviousResult());
	}

	showNext() {
		const {dispatch} = this.props;
		dispatch(showNextResult());
	}

	render () {
	 let { item } = this.props
	 console.log(item);
	 if (_.isUndefined(item)) {
		 return (<Spinner />)
	 }
	 return (

		 <div className="result">
			 <div className="prev-button" onClick={this.showPrevious.bind(this)}>
				 <i className="icon-angle-left"></i>
			 </div>
			 <div className="details">
				<img className="product-image" src={require('../../../images/'+item.image)} alt={item.title} width="200" height="200"/>
				<h2>{item.title}<br />
			 		#{item.PartNumber}
			 	</h2>

			</div>
			<div className="next-button" onClick={this.showNext.bind(this)}>
				<i className="icon-angle-right"></i>
			</div>
		 </div>
	 )
 	}
}

export default connect()(Result);
