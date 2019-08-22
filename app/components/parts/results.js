import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { pushPath } from 'redux-simple-router';
import { fetchParts, fetchRebuildKitDetails } from 'actions/parts';
import { PARTTYPES, DOUBLE_END_STUDS } from 'config/constants';
import NoResults from '../global/no-result';
import Waiting from '../global/waiting';
import _ from 'lodash';
import { Link } from 'react-router';
import classNames from 'classnames';

const FULLREPLACE = [115];
const SERVICEPARTS = [220, 5, 6, 8, 101,  241, 7];
const SERVICEKITS = [217, 218, 219, 221, 222, 223, 226, 227, 203];
const SPINDLENUTS = [];
const SPINDLESOCKETSIZE = { 10036548: 2, 10036549: 2, 10036550: 2.75, 10036551: 3.75, 10036552: 3.125, 10036553: 4 };

class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rebuildKitActive: false,
    };
  }
  componentDidMount() {
    const { dispatch, params } = this.props;
    if (params.id) {
      dispatch(fetchParts(params.id));
    } else {
      dispatch(pushPath('/parts/search'));
    }
  }

  showHeader(allowed = []) {
    const { parts } = this.props;
    let found = false;
    parts.AftermarketParts.map((item, index) => {
      console.log(allowed, item);
      if (-1 !== allowed.indexOf(item.TypeId)) {
        found = true;
      }
    });
    return found;
  }

  renderTable(viewArray = [], item) {
    const { dispatch, parts } = this.props;
    if (!viewArray) {
      return null;
    }

    let view = viewArray.map((part, index) => {
      let appendStr = '';
      if (item.Usages && item.Usages.length > 0) {
        appendStr = item.Usages[part.UsageId];
      }

      if (viewArray.length > 1 && part.TypeId === 115) {
        //if (part.Description.indexOf('PreSet') > -1) {
        return (
          <tr key={index}>
            <td>
              <Link to={'/hub-selection/details/' + part.PartNumber}>{item.AftermarketPartTypeName + appendStr}</Link>
            </td>
            <td>{part.PartNumber}</td>
          </tr>
        );
        //}
      } else {
        if (part.TypeId === 115) {
          return (
            <tr key={index}>
              <td>
                <Link to={'/hub-selection/details/' + part.PartNumber}>{item.AftermarketPartTypeName + appendStr}</Link>
              </td>
              <td>{part.PartNumber}</td>
            </tr>
          );
        } else {
          const isRebuildKit = parts.rebuildKitDetails.length && part.TypeId === 219;
          let partName = item.AftermarketPartTypeName + appendStr;
          if (part.TypeId === 219 && parts.rebuildKitNumber !== part.PartNumber) {
            dispatch(fetchRebuildKitDetails(part.PartNumber));
          }

          if (part.UsageId && DOUBLE_END_STUDS[part.UsageId]) {
            partName = DOUBLE_END_STUDS[part.UsageId];
          }

          return (
            <tr key={index}>
              <td>
                <table>
                  <tbody>
                  <tr>
                    <td>
                      {isRebuildKit ? (
                        <span
                          className={classNames('rebuild-kit-toggle', { show: this.state.rebuildKitActive })}
                          onClick={() => this.setState({ rebuildKitActive: !this.state.rebuildKitActive })}
                        />
                      ) : null}
                      {partName}
                    </td>
                    <td className="center">
                      {part.PartNumber}
                      <div className="help2">
                        {SPINDLESOCKETSIZE[part.PartNumber]
                          ? '(' + SPINDLESOCKETSIZE[part.PartNumber] + '" Socket)'
                          : ''}
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
                {isRebuildKit
                  ? parts.rebuildKitDetails.map(item => {
                    return (
                      <div
                        className={classNames('rebuild-kit-info', { show: this.state.rebuildKitActive })}
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
                    );
                  })
                  : null}
              </td>
            </tr>
          );
        }
      }
    });

    return view;
  }

  render() {
    const { parts, dispatch, images, app, history, results } = this.props;

    if (parts.isFetching) {
      return <Waiting />;
    }

    if (parts.AftermarketParts.length === 0) {
      return <NoResults />;
    }

    let replacementHeader,
      serviceKitHeader,
      servicePartHeader,
      spindleNutsHeader = null;
    parts.AftermarketParts.map((item, index) => {
      if (-1 !== FULLREPLACE.indexOf(item.TypeId)) {
        replacementHeader = <h2>Full Replacement Hub</h2>;
      }

      if (-1 !== SERVICEKITS.indexOf(item.TypeId)) {
        serviceKitHeader = <h2>Service & Rebuild Kits</h2>;
      }

      if (-1 !== SERVICEPARTS.indexOf(item.TypeId)) {
        servicePartHeader = <h2>Service Parts</h2>;
      }

      if (-1 !== SPINDLENUTS.indexOf(item.TypeId)) {
        spindleNutsHeader = <h2>Spindle Nut Kits</h2>;
      }
    });
    console.log(parts.AftermarketParts);
    return (
      <div className="grid-container main-content">
        <h2>Hub Components Search Results for:</h2>
        <h2 className="partsSubHead">
          {parts.HubAssemblyDescription} <span className="number">{parts.HubAssemblyNumber}</span>
        </h2>
        <div className="parts">
          {results.filters.Results[0].PartStatus === 'Terminated'? '' : replacementHeader}
          <table>
            <tbody>
            {PARTTYPES.map((item, index) => {
              if (-1 < FULLREPLACE.indexOf(item.PartTypeId)) {
                let filtered = _.filter(parts.AftermarketParts, { TypeId: item.PartTypeId });
                filtered = filtered.sort(function(a, b) {
                  return a.Ranking > b.Ranking;
                });
                //Return only the first item
                if (filtered.length) {
                  return this.renderTable([filtered.shift()], item);
                }
              }
            })}
            </tbody>
          </table>

          {serviceKitHeader}

          <table>
            <tbody>
            {PARTTYPES.map((item, index) => {
              if (-1 < SERVICEKITS.indexOf(item.PartTypeId)) {
                let filtered = _.filter(parts.AftermarketParts, { TypeId: item.PartTypeId });
                if (filtered.length) {
                  return this.renderTable(filtered, item);
                }
              }
            })}
            </tbody>
          </table>

          {servicePartHeader}

          <table>
            <tbody>
            {PARTTYPES.map((item, index) => {
              if (-1 < SERVICEPARTS.indexOf(item.PartTypeId)) {
                let filtered = _.filter(parts.AftermarketParts, { TypeId: item.PartTypeId });
                if (filtered.length) {
                  return this.renderTable(filtered, item);
                }
              }
            })}
            </tbody>
          </table>

          {spindleNutsHeader}

          <table>
            <tbody>
            {PARTTYPES.map((item, index) => {
              if (-1 < SPINDLENUTS.indexOf(item.PartTypeId)) {
                let filtered = _.filter(parts.AftermarketParts, { TypeId: item.PartTypeId });
                if (filtered.length) {
                  return this.renderTable(filtered, item);
                }
              }
            })}
            </tbody>
          </table>
        </div>
        <a href="javascript:void(0)" onClick={history.goBack.bind(this)} className="general-button">
          Return to search
        </a>
      </div>
    );
  }
}
export default connect()(Results);
