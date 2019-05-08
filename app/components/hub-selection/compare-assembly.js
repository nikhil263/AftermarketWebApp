import React, {Component} from 'react';
import Spinner from 'components/global/spinner';
import {fetchCompareAssemblyDetails} from 'actions/assembly';
import {connect} from 'react-redux';
import {IMAGE_CDN} from "config/constants";
import CompareItem from "components/hub-selection/compare-item";

const propertyLabels = {
  "Material": 'Material',
  "AxlePosition": 'Axle Position',
  "Axle": 'Axle',
  "HubAssemblyType": "Assembly Type",
  "BearingNumberInboard": "Bearing Cup (Inboard)",
  "BearingNumberOutboard": "Bearing Cup (Outboard)",
  "BrakeType": "Compatible Brake Type",
  "HubMountingSystem": "Hub Mounting System",
  "WheelStudStandoutInch": "Wheel Stud Standout (in.)",
  "WheelMaterial": "Wheel Material",
  "FlangeOffsetInch": "Flange Offset (in.)",
  "WeightPound": "Weight (lbs.)",
  "ABSRingIncluded": "Is ABS Ring Included",
  "HubRatingPound": "Hub Rating Pound",
  "WheelStudBoltCircleDiameterInch": "Wheel Stud Bolt Circle Diameter Inch",
};

class CompareAssembly extends Component {
  componentDidMount() {
    const {dispatch, params} = this.props;
    const ids = Object.keys(params).map(i => params[i]).join(',');
    dispatch(fetchCompareAssemblyDetails(ids));
  }

  render() {
    const {assembly, history} = this.props;
    const {compare: {results, differentProperties}} = assembly;
    console.log('#######', assembly);

    if (assembly.isFetching) {
      return <Spinner isFetching/>;
    }

    return (
      <div className="grid-container main-content" id="hubAssemblyResult">
        <h2>Compare Details</h2>

        <div className="grid-content flex-row">
          {results.map((item, index) => {
            return (
              <div className="small-6" key={index}>
                {item.Images && item.Images[0] && (
                  <img className="product-image" src={require('../../images/blank1x1.png')}
                       style={{background: "url('" + IMAGE_CDN + item.Images[0].ImageGuid + '.png' + "') center center no-repeat"}}
                       alt={item.HubAssemblyNumber}/>
                )}
                <div className="compare-part-number">{item.Description}</div>
                <div className="compare-part-number">{item.PartNumber}</div>
              </div>
            )
          })}

          {results.map((item, index) => {
            const keys = Object.keys(propertyLabels);
            const nextItem = results[index + 1];

            if (index) {
              return null;
            }

            return (
              <div className="compare-props-wrapper accordion" key={`prop-${index}`}>
                {keys.map((key, index) => {
                  return (
                    <CompareItem
                      key={`key-${key}`}
                      isDifferent={differentProperties.includes(key)}
                      {...{item, nextItem, index, property: key, label: propertyLabels[key]}}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
        <a href="javascript:void(0)" onClick={history.goBack.bind(this)} className="general-button">Return to
          results</a>
      </div>
    )
  }
}

export default connect()(CompareAssembly)
