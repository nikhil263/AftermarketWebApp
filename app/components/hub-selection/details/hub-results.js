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
						<li>Less Downtime</li>
						<li>Simplified Process</li>
						<li>Liability Protection</li>
					</ul>
				</div>
            )
        }else{
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
        if(note.Links){
            let firstPart = text.substr(0,text.indexOf('{{'));
            let secondPart = text.substr((text.indexOf('}}')+2),text.length);
            let number = parseInt(text.split('{{')[1]);
            return (
				<div className="note">
                    {firstPart}<a target="_blank" href={"https://conmetaftermarketpubliccdn.azureedge.net/documents/"+note.Links[0]}>{number}</a>{secondPart}
				</div>
            )
		}else{
			return (
				<div className="note">{text}</div>
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
				<h1>Success!</h1>
				{selectedHubAssemblyNumber ? <p className="text-center">for {selectedHubAssemblyNumber}</p> : '' }
				<div className="grid-content flex-row">
                    {results.map((item,index) => {
                        let assemblyType = item.AftermarketDescription.toLowerCase().includes('preset');
                        return <div className={results.length === 2 ? "small-6" : "small-12"} key={index}>
							<img className="product-image"  src={IMAGE_CDN+item.Images[0].ImageGuid+'.png'} alt={item.HubAssemblyNumber} />
							<div className="type">{assemblyType ? "PreSet" : "Conventional"}</div>
							<div className="number">{item.HubAssemblyNumber}</div>
							<HubResults assemblyType={assemblyType} key={index} />
						</div>
                    })}

                    {spindleNut ? <div className="optional-spindle">
						Optional Spindle nut: {spindleNut} (PreSet Hubs Only)
					</div> : ""}
                    {results.map((item,index) => {
                        return <div className={results.length === 2 ? "small-6" : "small-12"} key={index}>
							<Link to={'/hub-selection/details/'+item.HubAssemblyNumber} key={index} className="general-button">See Details</Link>
						</div>
                    })}
					<div className="clearfix" />
				</div>
				<SetLink note={results[0].GawrNote} />
				<div className="disclaimer"><Link to="/disclaimer">ConMet Wheel End Disclaimer</Link></div>
			</div>
		)
	}
}

export default connect()(Result);
