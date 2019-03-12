import React, { PropTypes, Component, Image } from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router';
import {showPreviousResult, showNextResult} from 'actions'
import { IMAGE_CDN } from 'config/constants'
import _ from 'lodash'
import Spinner from 'components/global/spinner'

class NextButton extends Component {

	nextClass() {
		let {idx, total, showButton} = this.props;
		let defaultClass = 'next-button';
		defaultClass = (showButton()) ? defaultClass + ' hide-button': defaultClass;
		if (idx === total-1) {
			return defaultClass + ' disabled'
		}
		return defaultClass
	}



	render() {
		let { handleClick } = this.props;

		return (
			<div className={this.nextClass()} onClick={handleClick}>
				<i className="icon-angle-right" />
			</div>
		)
	}
}

class PreviousButton extends Component {

	previousClass() {
		let {idx, showButton} = this.props;
		let defaultClass = 'prev-button';
		defaultClass = (showButton()) ? defaultClass + ' hide-button': defaultClass;
		if (idx === 0) {
			return defaultClass + ' disabled'
		}
		return defaultClass
	}

	render() {
		let { handleClick} = this.props;
		return (
			<div className={this.previousClass()} onClick={handleClick}>
				<i className="icon-angle-left" />
			</div>
		)
	}
}

class HubSingleResult extends Component {

	renderButtons() {
		let { total } = this.props;
		return total === 1;
	}

	handleNextClick() {
		const {dispatch} = this.props;
		dispatch(showNextResult());
	}

	handlePreviousClick() {
		const {dispatch} = this.props;
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
	addLinks(str, links) {
		if (str === undefined) {
			return null
		}
		let matches = str.match(/{{(.*?)}}/g) || []

		matches = matches.map(function(n, idx) {
			if (links.length > 0){

				return [n, n.replace('{{', '<a href="https://conmetaftermarketpubliccdn.azureedge.net/documents/'+links[idx]+'">').replace('}}', '</a>')]

			}
		});
		matches.forEach(item => {
			str = str.replace(item[0], item[1])
		});
		return <p dangerouslySetInnerHTML={{__html: str}}></p>;
	}
	render () {
		let { idx, total, item, spindleNut, short_studs, selectedHubAssemblyNumber } = this.props;
		let studs = null;

		if (_.isUndefined(item) || item.id === -1) {
			return (<Spinner />)
		}

		let note = null;

		if (!_.isUndefined(item.GawrNote)) {
			note = this.addLinks(item.GawrNote.Text, item.GawrNote.Links)
		}

		if (short_studs && short_studs.length) {
			studs = short_studs.map(item => item.HubAssemblyNumber).join(',');
		}

		return (
			<div>
				<h1>Success! The following hub is recommended</h1>
				{selectedHubAssemblyNumber ? <p className="text-center">for {selectedHubAssemblyNumber}</p> : '' }
				<div className="result">
					<PreviousButton
						idx={idx}
						total={total}
						handleClick={this.handlePreviousClick.bind(this)}
						showButton={this.renderButtons.bind(this)} />

					<div className="details">
						{
							item.Images.map((image, index) => {
								return <img className="product-image"  src={IMAGE_CDN+image.ImageGuid+'.png'}  key={index} alt={item.HubAssemblyNumber} width="200" height="200" />
							})
						}
						<h2>{item.title || item.AftermarketDescription}<br />
							{item.HubAssemblyNumber}
						</h2>
						{studs && <div className="optional-spindle">(Long Stud version: {studs})</div>}
						{spindleNut && <div className="optional-spindle">Optional Spindle nut: {spindleNut} (Aftermarket PreSet Hubs Only)</div>}
						{note}
						<Link to={'/hub-selection/details/'+item.HubAssemblyNumber} className="general-button">See Details</Link>
						<div className="text-center disclaimer"><Link to="/disclaimer">ConMet Wheel End Disclaimer</Link></div>
					</div>
					<NextButton
						idx={idx}
						total={total}
						handleClick={this.handleNextClick.bind(this)}
						showButton={this.renderButtons.bind(this)}
					/>
				</div>
			</div>
		)
	}
}

export default connect()(HubSingleResult);
