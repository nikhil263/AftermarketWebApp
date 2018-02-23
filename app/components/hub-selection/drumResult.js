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

	render() {
		const { drumResult } = this.props;
        this.state.resultsLength = drumResult.length;

        if((drumResult.length > 0) && (drumResult.length === 2)) {
            return (
				<div className="grid-container main-content" id="hubAssemblyResult">
					<h1>Success! The following ConMet Drum is recommended</h1>
					<div className="grid-content flex-row">
						{
							drumResult.map((item, index) => {
								return (
									<div className="small-6" key={index}>
										<p className="brake-type">{item.BrakeType}</p>
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
                    <h1>Success! The following ConMet Drum is recommended</h1>
					<div className="result">
						<div className={classNames("prev-button", { 'hide-button': ((drumResult.length <= 1) || (this.state.selectedIndex === 0)) })} onClick={this.prevData}>
							<i className="icon-angle-left" />
						</div>
						{
							<div className="details">
								<p>{data.BrakeType}</p>
								<h4>{data.BrakeDrumNumber}</h4>
                                {
                                    data.Images.map((image, index) => {
                                        return <img className="product-image"  src={IMAGE_CDN+image.ImageGuid+'.png'}  key={index} alt={data.BrakeDrumNumber} width="200" height="200" />
                                    })
                                }
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
