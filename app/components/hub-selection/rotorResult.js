import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames';
import { IMAGE_CDN } from 'config/constants';

class RotorResult extends React.Component {
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
		const { rotorResult } = this.props;
        this.state.resultsLength = rotorResult.length;

        if((rotorResult.length > 0) && (rotorResult.length === 2)) {
            return (
				<div className="grid-container main-content" id="hubAssemblyResult">
					<h1>Success! The following rotor is recommended</h1>
					<div className="grid-content flex-row">
						{
							rotorResult.map((item, index) => {
								return (
									<div className="small-6" key={index}>
										<p className="brake-type">{item.BrakeRotorType}</p>
										<div className="number">{item.BrakeRotorNumber}</div>
										<img className="product-image"  src={require('../../images/blank1x1.png')} style={{background: "url('"+IMAGE_CDN+item.Images[0].ImageGuid+'.png'+"') center center no-repeat"}} alt={item.HubAssemblyNumber} />
                                        <div className="weight">Brake Rotor Kit Number: {item.BrakeRotorKitNumber}</div>
										<Link to={'/hub-selection/replacement-rotor/rotordetails/'+item.BrakeRotorNumber} className="general-button">See Details</Link>
									</div>
								);
							})
						}
						<div className="clearfix" />
					</div>
					<div className="disclaimer"><Link to="/disclaimer">ConMet Wheel End Disclaimer</Link></div>
				</div>
            )
		}else if (rotorResult.length > 0) {
			const data = rotorResult[this.state.selectedIndex];
            return (
				<div>
                    <h1>Success! The following rotor is recommended</h1>
					<div className="result">
						<div className={classNames("prev-button", { 'hide-button': ((rotorResult.length <= 1) || (this.state.selectedIndex === 0)) })} onClick={this.prevData}>
							<i className="icon-angle-left" />
						</div>
						{
							<div className="details">
                                {
                                    data.Images.map((image, index) => {
                                        return <img className="product-image"  src={IMAGE_CDN+image.ImageGuid+'.png'}  key={index} alt={data.BrakeRotorNumber} width="200" height="200" />
                                    })
                                }
                                <h2>
                                    <div>Rotor Replacement kit:</div>
                                    <div>{data.BrakeRotorKitNumber}</div>
                                </h2>
                                <div className="optional-spindle">Replaces Rotor {data.BrakeRotorNumber}</div>
								<Link to={'/hub-selection/replacement-rotor/rotordetails/'+data.BrakeRotorNumber} className="general-button">See Details</Link>
								<div className="text-center disclaimer"><Link to="/disclaimer">ConMet Wheel End Disclaimer</Link></div>
							</div>
						}
						<div className={classNames("next-button", { 'hide-button': ((rotorResult.length <= 1) || (rotorResult.length - 1 === this.state.selectedIndex)) })} onClick={this.nextData}>
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
export default connect()(RotorResult)