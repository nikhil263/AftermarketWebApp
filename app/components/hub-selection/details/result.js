import React, { PropTypes, Component, Image } from 'react';
import HubSelection from 'components/hub-selection';
import { pushPath } from 'redux-simple-router'
import { connect } from 'react-redux'
import {Link} from 'react-router';
import {showPreviousResult, showNextResult} from 'actions'
import {fetchImages} from 'actions/images'
import { AFTERMARKET_DETAILS } from 'config/constants'
import _ from 'lodash'
import Spinner from 'components/global/spinner'

class NextButton extends Component {

	nextClass() {
		let {idx, total, showButton} = this.props
		let defaultClass = 'next-button'
		defaultClass = (showButton()) ? defaultClass + ' hide-button': defaultClass;
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
		let {idx, total, showButton} = this.props
		let defaultClass = 'prev-button'
		defaultClass = (showButton()) ? defaultClass + ' hide-button': defaultClass;
		if (idx === 0) {
			return defaultClass + ' disabled'
		}
		return defaultClass
	}

	render() {
		let { idx, total, handleClick} = this.props
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

	componentDidMount() {
		const { dispatch, item, images } = this.props;
		dispatch(fetchImages(item.Images, images));
	}

	showPrevious(idx, total) {
		const {dispatch } = this.props;
		if (idx !== 0) {
			// dispatch(showPreviousResult());
		}
	}

	showNext(idx, total) {
		const {dispatch} = this.props;
		// dispatch(showNextResult());
	}

	renderButtons() {
		let {idx, total} = this.props
		return total === 1;
	}

	handleNextClick() {
		const {idx, total, dispatch} = this.props;
		dispatch(showNextResult());
	}

	handlePreviousClick() {
		const {idx, total, dispatch} = this.props;
		dispatch(showPreviousResult());
	}

	renderPreviousBtn() {
		if (this.renderButtons()) {

		}
		return ''
	}

	renderNextBtn() {
		if (this.renderButtons()) {

		}
		return ''
	}

	render () {
	 let { idx, total, item, dispatch, images } = this.props

	 if (_.isUndefined(item) || item.id === -1) {
		 return (<Spinner />)
	 }


	return (
 	 <div className="result">

			<PreviousButton
				idx={idx}
				total={total}
				handleClick={this.handlePreviousClick.bind(this)}
				showButton={this.renderButtons.bind(this)} />

		 	<div className="details">
				{
					images.selected.map((image, index) => {
							return <img className="product-image"  src={image.Base64EncodedImage}  key={index} alt={item.PartNumber} width="200" height="200" />
					})
				}

				<h2>{item.title || item.Description}<br />
			 		#{item.PartNumber}
			 	</h2>
				<Link to={'/hub-selection/details/'+item.PartNumber} className="general-button">See Details</Link>
			</div>
			<NextButton
				idx={idx}
				total={total}
				handleClick={this.handleNextClick.bind(this)}
				showButton={this.renderButtons.bind(this)}
				/>

		</div>
	 )
 	}
}

export default connect()(Result);
