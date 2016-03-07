import React, { PropTypes, Component } from 'react';
import {Link} from 'react-router';
import {fetchImages} from 'actions/images'
import { connect } from 'react-redux'

class Meta extends Component {
	componentDidMount() {
		const { dispatch, result, images } = this.props;
		// console.log("Result", result);
		dispatch(fetchImages(result.mainImageId, images));
	}
	render() {
		const { result, images } = this.props
		// console.log(images)
		return (
				<div className="meta">
					{
						images.cache.map((image, index) => {
							// console.log(image)
							if (image.id == result.mainImageId) {
								// console.log(result)
								return <img className="product-image"  src={image.Base64EncodedImage}  key={index} alt={result.PartNumber} width="100" height="100" />
							}

						})
					}
					{result.Description}<br />
				<em>#{result.PartNumber}</em>
				</div>
			)
	}
};

export default connect()(Meta);
