import React, { PropTypes, Component } from 'react';
import classNames from "classnames";

export default class extends Component {
  constructor() {
    super();

    this.state = {
      rebuildKitActive: false,
    };

    this.renderRebuildKit = this.renderRebuildKit.bind(this);
  }

  renderRebuildKit() {
    const { parts: { rebuildKitDetails }, rebuildKitNumber } = this.props;
    const presetRebuild = [];

    if (rebuildKitDetails && rebuildKitDetails.length) {
      presetRebuild.push(
        <tr style={{ border: 'none' }}>
          <td>
          <span
            className={classNames('rebuild-kit-toggle', { show: this.state.rebuildKitActive })}
            onClick={() => this.setState({ rebuildKitActive: !this.state.rebuildKitActive })}
          />
            PreSet / PreSet Plus Hub Rebuild Kit
          </td>
          <td>
            {rebuildKitNumber}
          </td>
        </tr>
      );

      presetRebuild.push(
        <tr style={{ paddingTop: 0 }}>
          <td colSpan={2} style={{ padding: !this.state.rebuildKitActive ? 0 : '' }}>
            {
              rebuildKitDetails.map(item => (
                <div
                  className={classNames('rebuild-kit-info', { 'show m-0': this.state.rebuildKitActive })}
                  key={item.PreSetPreSetPlusHubRebuildKitNumber}
                >
                  <div>
                    <span className="text">Inner Bearing</span>{' '}
                    <span className="number">{item.BearingSetNumberInboard}</span>
                  </div>
                  <div>
                    <span className="text">Outer Bearing</span>{' '}
                    <span className="number">{item.BearingSetNumberOutboard}</span>
                  </div>
                  <div>
                    <span className="text">Seal & Spacer</span>{' '}
                    <span className="number">{item.SealAndSpacerKitNumber}</span>
                  </div>
                </div>
              ))
            }
          </td>
        </tr>
      )
    }

    return presetRebuild;
  }

  render() {
    const { result, parts: { AftermarketParts } } = this.props;
    let replacementRotorKit = null;

    if (AftermarketParts && AftermarketParts.length) {
      replacementRotorKit = AftermarketParts.filter(part => part.TypeId === 203);
    }

    return (
      <div className="specs">
        <h2>Product Specs</h2>
        <table>
          <tbody>
          <tr>
            <td>Material</td>
            <td>{result.Material}</td>
          </tr>
          <tr>
            <td>Axle Position</td>
            <td>{result.AxlePosition}</td>
          </tr>
          <tr>
            <td>Axle</td>
            <td>{result.Axle}</td>
          </tr>
          <tr>
            <td>Assembly Type</td>
            <td>{result.HubAssemblyType}</td>
          </tr>
          <tr>
            <td>Bearing {result.BearingNumbersType} (Inboard)</td>
            <td>{result.BearingNumberInboard}</td>
          </tr>
          <tr>
            <td>Bearing {result.BearingNumbersType} (Outboard)</td>
            <td>{result.BearingNumberOutboard}</td>
          </tr>
          <tr>
            <td>Compatible Brake Type</td>
            <td>{result.BrakeType}</td>
          </tr>
          {
            replacementRotorKit && replacementRotorKit.length ?
              <tr><td>Replacement Rotor Kit</td><td>{replacementRotorKit[0]["PartNumber"]}</td></tr> : null
          }
          <tr>
            <td>Hub Mounting System</td>
            <td>{result.HubMountingSystem}</td>
          </tr>
          <tr>
            <td>Wheel Stud Standout (in.)</td>
            <td>{result.WheelStudStandoutInch}</td>
          </tr>
          <tr>
            <td>Wheel Material</td>
            <td>{result.WheelMaterial}</td>
          </tr>
          <tr>
            <td>Flange Offset (in.)</td>
            <td>{result.FlangeOffsetInch}</td>
          </tr>
          <tr>
            <td>Weight (lbs.)</td>
            <td>{result.WeightPound}</td>
          </tr>
          {
            result.ConventionalHubNumber ? (
              <tr>
                <td>Conventional Hub Option</td>
                <td>{result.ConventionalHubNumber}</td>
              </tr>
            ) : null
          }
          {this.renderRebuildKit()}
          </tbody>
        </table>
      </div>
    )
  }
};
