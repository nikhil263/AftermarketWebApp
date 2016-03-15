import React, { PropTypes, Component } from 'react';
import {Link} from 'react-router';
import {fetchImages} from 'actions/images'
import { connect } from 'react-redux'

class Meta extends Component {
	render() {
		const { result, images } = this.props
		// console.log(images)
		return (
				<div className="meta">
					{
						result.image.map((image, index) => {
								return <img className="product-image"  src={image.Base64EncodedImage}  key={index} alt={result.PartNumber + ' ' + image.ImageId} width="100" height="100" />
						})
					}
					{result.Description}<br />
				<em>#{result.PartNumber}</em>
				</div>
			)
	}
};

export default connect()(Meta);
