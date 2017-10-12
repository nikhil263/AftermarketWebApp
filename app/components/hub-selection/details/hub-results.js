import React, { PropTypes, Component, Image } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import { IMAGE_CDN } from 'config/constants';

class HubResults extends React.Component {
    render() {
        let assemblyType = this.props.assemblyType;
        if(assemblyType){
            return (
				<div className="details">
					<div>Best Value:</div>
					<ul>
						<li>Extended Warranty</li>
						<li>Less DownTime</li>
						<li>Simplified Process</li>
						<li>Liability Protection</li>
					</ul>
				</div>
            )
        }else{
            return (
				<div className="details">
					<div>Not Included:</div>
					<ul>
						<li>Bearing Cones</li>
						<li>Seal</li>
						<li>Manually Adjusted</li>
					</ul>
				</div>
            )
        }
    }
}

class Result extends Component {
	render(){
		let results = this.props.results;
		let spindleNut = this.props.spindleNut;
		let selectedHubAssemblyNumber = this.props.selectedHubAssemblyNumber;
		return(
			<div className="grid-container main-content" id="hubAssemblyResult">
				<h1>Success !</h1>
				{selectedHubAssemblyNumber ? <p className="text-center">for {selectedHubAssemblyNumber}</p> : '' }
				<div className="grid-content flex-row">
                    {results.map((item,index) => {
                        let assemblyType = item.AftermarketDescription.toLowerCase().includes('preset');
                        return <div className={results.length === 2 ? "small-6" : "small-12"}>
							<img className="product-image"  src={IMAGE_CDN+item.Images[0].ImageGuid+'.png'} alt={item.HubAssemblyNumber} />
							<div className="type">{assemblyType ? "PreSet" : "Conventional"}</div>
							<div className="number">#{item.HubAssemblyNumber}</div>
							<HubResults assemblyType={assemblyType} key={index} />
						</div>
                    })}

                    {spindleNut ? <div className="optional-spindle">
						Optional Spindle nut: {spindleNut}
					</div> : ""}
                    {results.map((item,index) => {
                        return <div className={results.length === 2 ? "small-6" : "small-12"}>
							<Link to={'/hub-selection/details/'+item.HubAssemblyNumber} key={index} className="general-button">See Details</Link>
						</div>
                    })}
					<div className="clearfix" />
				</div>
				<div className="disclaimer">ConMet Wheel End Disclaimer</div>
				<div className="note">
                    {results[0].GawrNote.Text}
				</div>
			</div>
		)
	}
}

export default connect()(Result);
