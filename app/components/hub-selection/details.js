import React, { PropTypes, Component } from 'react';
import Specs from 'components/hub-selection/details/specs';
import Meta from 'components/hub-selection/details/meta';
import Spinner from 'components/global/spinner';
import { fetchAssemblyDetails } from 'actions/assembly';
import { fetchParts, fetchRebuildKitDetails } from 'actions/parts';
import { connect } from 'react-redux';
import {IMAGE_CDN} from "config/constants";

class Details extends Component {
  constructor() {
    super();

    this.state =  {
      rebuildKitNumber: null,
    };
    this.fetchRebuildKit = this.fetchRebuildKit.bind(this);
  }
  componentDidMount() {
    const { dispatch, params, images } = this.props;
    dispatch(fetchParts(params.id));
    dispatch(fetchAssemblyDetails(params.id, images));
    this.fetchRebuildKit(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.fetchRebuildKit(newProps);
  }

  fetchRebuildKit(props) {
    const { parts, dispatch } = props;
    const { AftermarketParts } = parts;

    if (AftermarketParts && AftermarketParts.length) {
      const rebuildKit = AftermarketParts.filter(t => t.TypeId === 219);
      if (rebuildKit && rebuildKit.length) {
        const partNumber = rebuildKit[0].PartNumber;
        this.setState({ rebuildKitNumber: partNumber });
        if (parts.rebuildKitNumber !== partNumber) {
          dispatch(fetchRebuildKitDetails(partNumber));
        }
      }
    }
  }

  render() {
    const { assembly, images, history, parts } = this.props;

    if (parts.isFetching) {
      return <Spinner isFetching />;
    }

    return (
      <div className="grid-container main-content">
        <h2 className="product-details">Product Details</h2>
        {assembly.result.map((r, index) => {
          return (
            <div key={index}>
              <Meta result={r} images={images} />
              <Specs result={r} parts={parts} {...this.state} />
              {
                r.Images.map((image, index) => {
                  if (index === 1) {
                    return (
                      <img
                        key={index}
                        className="product-image danger"
                        src={IMAGE_CDN + image.ImageGuid + '.png'}
                        alt={r.PartNumber}
                        width="100"
                        height="100"
                      />
                    )
                  }

                  return null;
                })
              }
            </div>
          )
        })}
        <a href="javascript:void(0)" onClick={history.goBack.bind(this)} className="general-button">Return to results</a>
      </div>
    )
  }
}

export default connect()(Details)
