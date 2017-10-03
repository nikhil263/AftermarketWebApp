import React, { PropTypes, Component } from 'react';
import {Link} from 'react-router';
import {fetchImages} from 'actions/images'
import { connect } from 'react-redux'
import { IMAGE_CDN } from 'config/constants'

class Meta extends Component {
	render() {
		const { result, images } = this.props
		// console.log(images)
		return (
				<div className="meta">
					{
						result.Images.map((image, index) => {
								return <img className="product-image"  src={IMAGE_CDN+image.ImageGuid+'.png'}  key={index} alt={result.PartNumber} width="100" height="100" />
						})
					}
					{result.Description}<br />
				<em>{result.PartNumber}</em>
				</div>
			)
	}
};

export default connect()(Meta);
