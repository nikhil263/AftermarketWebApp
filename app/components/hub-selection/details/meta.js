import React, {Component} from 'react';
import {connect} from 'react-redux';
import {IMAGE_CDN} from 'config/constants';

class Meta extends Component {
  render() {
    const {result} = this.props;
    return (
      <div className="meta">
        {
          result.Images.map((image, index) => {
            if (index === 0) {
              return (
                <img
                  key={index}
                  className="product-image"
                  src={IMAGE_CDN + image.ImageGuid + '.png'}
                  alt={result.PartNumber}
                  width="100"
                  height="100"
                />
              )
            }

            return null;
          })
        }
        {result.Description}<br/>
        <em>{result.PartNumber}</em>
      </div>
    )
  }
}

export default connect()(Meta);
