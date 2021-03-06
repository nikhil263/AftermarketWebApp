import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames';
import { IMAGE_CDN } from 'config/constants';

class DrumResult extends React.Component {
  constructor(props) {
    super(props);
    this.prevData = this.prevData.bind(this);
    this.nextData = this.nextData.bind(this);

    this.state = {
      selectedIndex: 0,
      resultsLength: 0,
    };
  }

  nextData() {
    const selectedIndex = this.state.selectedIndex;
    if (selectedIndex <= this.state.resultsLength) {
      this.setState({selectedIndex: selectedIndex + 1});
    }
  }

  prevData() {
    const selectedIndex = this.state.selectedIndex;
    if (selectedIndex > 0) {
      this.setState({selectedIndex: selectedIndex - 1});
    }
  }

  componentDidMount() {
    this.setGridSameHeight();
	}

	componentDidUpdate() {
    this.setGridSameHeight();
	}

	setGridSameHeight() {
    const grid = document.querySelectorAll('.equalizer .small-6');
    if (grid && grid.length > 1) {
      grid.forEach((item, gridIndex) => {
        if (item && item.children && item.children.length) {
          const list = item.children;
          for (let i = 0; i < list.length; i++) {
            if (grid[gridIndex + 1] && grid[gridIndex + 1].children[i] &&
            	list[i].clientHeight !== grid[gridIndex + 1].children[i].clientHeight
						) {
              const currList = list[i];
              const nextList = grid[gridIndex + 1].children[i];
              const height = currList.clientHeight && nextList.clientHeight;

              if (height) {
                const updateElementList = document.querySelectorAll('.equalizer .small-6 .'+currList.className);

                for (let j = 0; j < updateElementList.length; j++) {
                	updateElementList[j].style.height = height+'px';
								}
							}
            }
          }
        }
      });
    }
	}

	renderBrakeType(brakeType) {
    if (brakeType.length < 21) {
      return brakeType;
    } else {
      const test = [];
      const i = brakeType.indexOf(' ');
      test.push(brakeType.slice(0, i), <br />, brakeType.slice(i + 1));
      return test;
    }
  }

  render() {
    const { drumResult } = this.props;
    this.state.resultsLength = drumResult.length;

    if((drumResult.length > 0) && (drumResult.length === 2)) {
      return (
        <div className="grid-container main-content" id="hubAssemblyResult">
          <h2>Success! The following drum is recommended</h2>
          <div className="grid-content equalizer flex-row">
            {
              drumResult.map((item, index) => {
                return (
                  <div className="small-6" key={index}>
                    <p className="brake-type">{this.renderBrakeType(item.BrakeType)}</p>
                    <div className="number">{item.BrakeDrumNumber}</div>
                    <img className="product-image"  src={require('../../images/blank1x1.png')} style={{background: "url('"+IMAGE_CDN+item.Images[0].ImageGuid+'.png'+"') center center no-repeat"}} alt={item.HubAssemblyNumber} />
                    <div className="weight">Weight: {item.WeightPound} Lbs</div>
                    <div className="seal-nut">Ball Seat Nut Compatible: {item.IsBsnCompatible ? 'Yes' : 'No'}</div>
                    <Link to={'/hub-selection/replacement-drum/drumdetails/'+item.BrakeDrumNumber} className="general-button">See Details</Link>
                    <div className="note">{item.Notes}</div>
                  </div>
                );
              })
            }
            <div className="clearfix" />
          </div>
          <div className="disclaimer"><Link to="/disclaimer">ConMet Wheel End Disclaimer</Link></div>
        </div>
      )
    }else if (drumResult.length > 0) {
      const data = drumResult[this.state.selectedIndex];
      return (
        <div>
          <h2>Success! The following drum is recommended</h2>
          <div className="result">
            <div className={classNames("prev-button", { 'hide-button': ((drumResult.length <= 1) || (this.state.selectedIndex === 0)) })} onClick={this.prevData}>
              <i className="icon-angle-left" />
            </div>
            {
              <div className="details">
                {
                  data.Images.map((image, index) => {
                    return <img className="product-image"  src={IMAGE_CDN+image.ImageGuid+'.png'}  key={index} alt={data.BrakeDrumNumber} width="200" height="200" />
                  })
                }
                <h2>
                  <div>{data.BrakeType}</div>
                  <div>{data.BrakeDrumNumber}</div>
                </h2>
                <p>{data.Notes}</p>
                <p>Weight: {data.WeightPound} Lbs</p>
                <p>Ball Seat Nut Compatible: {data.IsBsnCompatible ? 'Yes' : 'No'}</p>
                <Link to={'/hub-selection/replacement-drum/drumdetails/'+data.BrakeDrumNumber} className="general-button">See Details</Link>
                <div className="text-center disclaimer"><Link to="/disclaimer">ConMet Wheel End Disclaimer</Link></div>
              </div>
            }
            <div className={classNames("next-button", { 'hide-button': ((drumResult.length <= 1) || (drumResult.length - 1 === this.state.selectedIndex)) })} onClick={this.nextData}>
              <i className="icon-angle-right" />
            </div>
          </div>
        </div>
      )
    }else{
      return (<div />)
    }
  }
}
export default connect()(DrumResult)
