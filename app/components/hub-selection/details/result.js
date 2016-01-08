import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection';
import { pushPath } from 'redux-simple-router'
import { connect } from 'react-redux'
import {showPreviousResult, showNextResult} from 'actions'
import { AFTERMARKET_DETAILS } from 'config/constants'
import _ from 'lodash'
import Spinner from 'components/global/spinner'

class NextButton extends Component {

	nextClass() {
		let {idx, total} = this.props
		let defaultClass = 'next-button'
		if (idx === total-1) {
			return defaultClass + ' disabled'
		}
		return defaultClass
	}



	render() {
		let { idx, total, handleClick } = this.props
		return (
			<div className={this.nextClass()} onClick={handleClick}>
				<i className="icon-angle-right"></i>
			</div>
		)
	}
}

class PreviousButton extends Component {

	previousClass() {
		let {idx, total} = this.props
		let defaultClass = 'prev-button'
		if (idx === 0) {
			return defaultClass + ' disabled'
		}
		return defaultClass
	}

	render() {
		let { idx, total, handleClick} = this.props

		console.log(this.props)
		return (
			<div className={this.previousClass()} onClick={handleClick}>
				<i className="icon-angle-left"></i>
			</div>
		)
	}
}

class Result extends Component {
	constructor(props) {
		super(props)
		this.itemDetails = {};
	}

	showPrevious(idx, total) {
		const {dispatch } = this.props;
		if (idx !== 0) {
			// dispatch(showPreviousResult());
		}
	}

	showNext(idx, total) {
		console.log('here', idx, total)
		const {dispatch} = this.props;
		// dispatch(showNextResult());
	}

	handleNextClick() {
		const {idx, total, dispatch} = this.props;
		dispatch(showNextResult());
	}

	handlePreviousClick() {
		const {idx, total, dispatch} = this.props;
		dispatch(showPreviousResult());
	}




	render () {
	 let { idx, total, item, dispatch } = this.props
	 console.log('ITEM', item);
	 if (_.isUndefined(item) || item.id === 0) {
		 return (<Spinner />)
	 }
	 return (
 	 <div className="result">

			<PreviousButton idx={idx} total={total} handleClick={this.handlePreviousClick.bind(this)}/>

		 	<div className="details">
				<img className="product-image" src={require('../../../images/'+item.image)} alt={item.title} width="200" height="200"/>
				<h2>{item.title}<br />
			 		#{item.PartNumber}
			 	</h2>

			</div>
			<NextButton idx={idx} total={total} handleClick={this.handleNextClick.bind(this)}/>

		</div>
	 )
 	}
}

export default connect()(Result);
