import React, {PropTypes, Component, Image} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {IMAGE_CDN} from 'config/constants';

class HubResults extends React.Component {
  render() {
    let assemblyType = this.props.assemblyType;
    if (assemblyType) {
      return (
        <div className="details">
          <div>Best Value:</div>
          <ul>
            <li>Extended Warranty</li>
            <li>Less Downtime</li>
            <li>Simplified Process</li>
            <li>Liability Protection</li>
          </ul>
        </div>
      )
    } else {
      return (
        <div className="details">
          <div>Requires:</div>
          <ul>
            <li>Bearing Cones</li>
            <li>Seal</li>
            <li>Manual Adjustment</li>
          </ul>
        </div>
      )
    }
  }
}


class SetLink extends Component {
  render() {
    const note = this.props.note;
    let text = note.Text;
    if (note.Links) {
      let firstPart = text.substr(0, text.indexOf('{{'));
      let secondPart = text.substr((text.indexOf('}}') + 2), text.length);
      let number = parseInt(text.split('{{')[1]);
      return (
        <div className="note">
          {firstPart}<a target="_blank"
                        href={"https://conmetaftermarketpubliccdn.azureedge.net/documents/" + note.Links[0]}>{number}</a>{secondPart}
        </div>
      )
    } else {
      return (
        <div className="note">{text}</div>
      )
    }
  }
}


class Result extends Component {
  render() {
    const { results, spindleNut, selectedHubAssemblyNumber, short_studs } = this.props;

    return (
      <div className="grid-container main-content" id="hubAssemblyResult">
        <h1>Success!</h1>
        {selectedHubAssemblyNumber ? <p className="text-center">for {selectedHubAssemblyNumber}</p> : ''}
        <div className="grid-content flex-row">
          {results.map((item, index) => {
            let assemblyType = item.AftermarketDescription.toLowerCase().includes('preset');
            return (
              <div className={results.length === 2 ? "small-6" : "small-12"} key={index}>
                <img className="product-image" src={require('../../../images/blank1x1.png')}
                     style={{background: "url('" + IMAGE_CDN + item.Images[0].ImageGuid + '.png' + "') center center no-repeat"}}
                     alt={item.HubAssemblyNumber}/>
                <div className="type">{assemblyType ? "PreSet" : "Conventional"}</div>
                <div className="number">{item.HubAssemblyNumber}</div>
                <HubResults assemblyType={assemblyType} key={index}/>
                {short_studs && short_studs[index] && (
                  <div className="number text-center">
                    {`${short_studs[index].HubAssemblyNumber} (Long stud version)`}
                  </div>
                )}
              </div>
            )
          })}
          {spindleNut && (
            <div className="optional-spindle">
              <div className="small-6">Optional Spindle nut: {spindleNut} (Aftermarket PreSet Hubs Only)</div>
            </div>
          )}
          {results.map((item, index) => {
            return (
              <div className={results.length === 2 ? "small-6" : "small-12"} key={index}>
                <Link to={'/hub-selection/details/' + item.HubAssemblyNumber} key={index} className="general-button">See
                  Details</Link>
              </div>
            )
          })}
          <div className="clearfix"/>
        </div>
        <SetLink note={results[0].GawrNote}/>
        <div className="disclaimer"><Link to="/disclaimer">ConMet Wheel End Disclaimer</Link></div>
      </div>
    )
  }
}

export default connect()(Result);
