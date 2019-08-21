import React, {PropTypes, Component, Image} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router';
import {showPreviousResult, showNextResult} from 'actions'
import {IMAGE_CDN} from 'config/constants'
import _ from 'lodash'
import Spinner from 'components/global/spinner'
import {fetchLongStudApi} from "../../../utils";

class NextButton extends Component {

  nextClass() {
    let {idx, total, showButton} = this.props;
    let defaultClass = 'next-button';
    defaultClass = (showButton()) ? defaultClass + ' hide-button' : defaultClass;
    if (idx === total - 1) {
      return defaultClass + ' disabled'
    }
    return defaultClass
  }


  render() {
    let {handleClick} = this.props;

    return (
      <div className={this.nextClass()} onClick={handleClick}>
        <i className="icon-angle-right"/>
      </div>
    )
  }
}

class PreviousButton extends Component {

  previousClass() {
    let {idx, showButton} = this.props;
    let defaultClass = 'prev-button';
    defaultClass = (showButton()) ? defaultClass + ' hide-button' : defaultClass;
    if (idx === 0) {
      return defaultClass + ' disabled'
    }
    return defaultClass
  }

  render() {
    let {handleClick} = this.props;
    return (
      <div className={this.previousClass()} onClick={handleClick}>
        <i className="icon-angle-left"/>
      </div>
    )
  }
}

class HubSingleResult extends Component {
  constructor() {
    super();

    this.compareLongStuds = this.compareLongStuds.bind(this);

    this.state = {
      isFetching: false,
      shortStuds: [],
    };
  }

  renderButtons() {
    let {total} = this.props;
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

    matches = matches.map(function (n, idx) {
      if (links.length > 0) {
        return [n, n.replace('{{', '<a href="https://conmetaftermarketpubliccdn.azureedge.net/documents/' + links[idx] + '">').replace('}}', '</a>')]
      }
    });
    matches.forEach(item => {
      str = str.replace(item[0], item[1])
    });
    return <p className="note-addLinks" dangerouslySetInnerHTML={{__html: str}}/>;
  }

  componentWillMount() {
    const {short_studs} = this.props;

    if (short_studs && short_studs.length > 1) {
      this.setState({isFetching: true});
      this.compareLongStuds();
    }
  }

  async compareLongStuds() {
    const {item, short_studs} = this.props;
    const longStudFilter = `hanum=${item.HubAssemblyNumber}`;
    const t = await fetchLongStudApi(longStudFilter);
    const shortStuds = [];
    const promises = short_studs.map(async item => {
      const res = await fetchLongStudApi(`${longStudFilter},${item.HubAssemblyNumber}`);
      if (_.isEqual(_.sortBy(t.Results), _.sortBy(res.Results))) {
        shortStuds.push(item.HubAssemblyNumber);
      }
    });

    await Promise.all(promises);
    this.setState({isFetching: false, shortStuds});
  };

  render() {
    let {idx, total, item, spindleNut, short_studs, selectedHubAssemblyNumber} = this.props;
    const selectedNumber = selectedHubAssemblyNumber ? selectedHubAssemblyNumber.split(" ")[1] : '';
    const selectedConmet = selectedHubAssemblyNumber ? selectedHubAssemblyNumber.split(" ")[0] : '';
    const {isFetching, shortStuds} = this.state;
    let studs = null;

    if (_.isUndefined(item) || item.id === -1 || isFetching) {
      return (<Spinner isFetching/>)
    }

    let note = null;

    if (!_.isUndefined(item.GawrNote)) {
      note = this.addLinks(item.GawrNote.Text, item.GawrNote.Links)
    }

    if (short_studs && short_studs.length === 1) {
      studs = short_studs.map(item => item.HubAssemblyNumber).join(',');
    } else if (shortStuds && shortStuds.length) {
      studs = shortStuds.map(item => item).join(',');
    }

    return (
      <div>
        {/*<h2>Success! The following hub is recommended</h2>*/}
          <h2>{item.PartStatus === 'Active' || item.PartStatus === 'Service Only' ? 'The following hub is recommended' : 'This hub is no longer available'}</h2>
        {selectedHubAssemblyNumber ? <p className="text-center" style={selectedConmet === 'ConMet' ? {marginBottom: 0} : null}>for {selectedHubAssemblyNumber}</p> : ''}
          {selectedConmet === 'ConMet' ? <p className="text-center" style={{color: '#d31145'}}><Link to={'/parts/search/' +  selectedNumber}>(Looking for service components for {selectedNumber}?)</Link></p> : ''}
        <div className="result">
          <PreviousButton
            idx={idx}
            total={total}
            handleClick={this.handlePreviousClick.bind(this)}
            showButton={this.renderButtons.bind(this)}
          />
          <div className="details">
            {
              item.Images.map((image, index) => {
                if (index === 0) {
                  return (
                    <img
                      key={index}
                      className="product-image"
                      src={IMAGE_CDN + image.ImageGuid + '.png'}
                      alt={item.HubAssemblyNumber}
                      width="200"
                      height="200"
                    />
                  )
                }
              })
            }
            <h2 className="hub-name">{item.title || item.AftermarketDescription}<br/>
              {item.HubAssemblyNumber}<br/>
              {studs && `${studs} (Long stud version)`}
            </h2>
            {/*{spindleNut &&*/}
            {/*<div className="optional-spindle">Optional Spindle nut: {spindleNut} (Aftermarket PreSet Hubs Only)</div>}*/}
              {item.IsAftermarket === false && (item.PartStatus === 'Service Only' || item.PartStatus === 'Active') ?
              <div className="optional-spindle">This hub is made-to-order only. Please contact ConMet Customer Service for availability</div> : ''}
            {note}
            {
              item.Images.map((image, index) => {
                if (index === 1) {
                  return (
                    <img
                      key={index}
                      className="product-image danger"
                      src={IMAGE_CDN + image.ImageGuid + '.png'}
                      alt={item.HubAssemblyNumber}
                      width="200"
                      height="200"
                    />
                  )
                }
              })
            }
            <Link to={'/hub-selection/details/' + item.HubAssemblyNumber} className="general-button">See Details</Link>
            {/*{selectedNumber && selectedNumber !== item.HubAssemblyNumber &&(*/}
              {/*<Link*/}
                {/*to={`/hub-selection/compare/${selectedNumber}/${item.HubAssemblyNumber}`}*/}
                {/*className="general-button"*/}
              {/*>*/}
                {/*Compare*/}
              {/*</Link>*/}
            {/*)}*/}
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
