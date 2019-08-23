import React, { PropTypes, Component } from 'react';
import Step from 'components/hub-selection/step';
import { previousFilter } from 'actions/filters';
import {Link} from 'react-router';
import {unifiedSearch} from 'actions';
import {connect} from 'react-redux';
import Autocomplete from 'react-autocomplete';


class CompareHub extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            assembly1: '',
            assembly2: '',
            partNumber: [],
            loading: false,
        };
    }

    render() {
        const { dispatch } = this.props;
        console.log(this.props, this.state.assembly1)
        return (
					<div className="grid-container hub-compare">
						<div className="grid-content splash-title">
							<h2>Hub Comparision Tool</h2>
                                <h2>Enter ConMet Hub Assembly Part Numbers</h2>
								<div className="grid-block">
									<div className="grid-content medium-6 small-12"><h3>Assembly#1</h3></div>
									<div className="grid-content medium-4 small-12" id="autoComplete">
                                        <Autocomplete
                                            value={this.state.assembly1}
                                            inputProps={{ className: 'assembly-number', id:'assemblyNumber',type:'text' }}
                                            wrapperStyle={{ position: 'relative',display: 'block', margin: '0 0 1rem 0' }}
                                            items={this.state.partNumber}
                                            getItemValue={(item) => item.CompetitorPartNumber}
                                            onSelect={(value, state) => {
                                                this.props.results.selectedHubAssemblyNumber = state.CompetitorName+' '+state.CompetitorPartNumber;
                                                this.setState({ assembly1:value, partNumber: [state] })
                                            }}
                                            onChange={(event, value) => {
                                                this.setState({assembly1 : value, partNumber : [], loading: true });
                                                if(value !== ''){
                                                    dispatch(unifiedSearch(value)).then(() => {
                                                        let results = this.props.results.partNumber.Results;
                                                        if(results){
                                                            this.setState({ partNumber: this.props.results.partNumber.Results, loading: false });
                                                        }else{
                                                            this.setState({ partNumber: [], loading: false });
                                                        }
                                                    });
                                                }
                                            }}
                                            renderItem={(item, isHighlighted) =>
                                                <div className="menu-item" style={{ background: isHighlighted ? 'lightgray' : 'white' }} key={item.CompetitorInterchangesId}>
                                                    {item.CompetitorName}  {item.CompetitorPartNumber}
                                                </div>
                                            }
                                            renderMenu={(items, value) => (
                                                <div className="menu">
                                                    {value === '' ? (
                                                        <div className="item"><h6>Type ConMet assembly number</h6></div>
                                                    ) : this.state.loading ? (
                                                        <div className="item"><h6>Loading...</h6></div>
                                                    ) : items.length === 0 ? (
                                                        <div className="item"><h6>No matches for {value}</h6></div>
                                                    ) : items}
                                                </div>
                                            )}
                                        />
									</div>
                                    <div className="grid-content medium-6 small-12"><h3>Assembly#2</h3></div>
                                    <div className="grid-content medium-4 small-12" id="autoComplete">
                                        <Autocomplete
                                            value={this.state.assembly2}
                                            inputProps={{ className: 'assembly-number', id:'assemblyNumber',type:'text' }}
                                            wrapperStyle={{ position: 'relative',display: 'block', margin: '0 0 1rem 0' }}
                                            items={this.state.partNumber}
                                            getItemValue={(item) => item.CompetitorPartNumber}
                                            onSelect={(value, state) => {
                                                this.props.results.selectedHubAssemblyNumber = state.CompetitorName+' '+state.CompetitorPartNumber;
                                                this.setState({ assembly2:value, partNumber: [state] })
                                            }}
                                            onChange={(event, value) => {
                                                this.setState({assembly2 : value, partNumber : [], loading: true });
                                                if(value !== ''){
                                                    dispatch(unifiedSearch(value)).then(() => {
                                                        let results = this.props.results.partNumber.Results;
                                                        if(results){
                                                            this.setState({ partNumber: this.props.results.partNumber.Results, loading: false });
                                                        }else{
                                                            this.setState({ partNumber: [], loading: false });
                                                        }
                                                    });
                                                }
                                            }}
                                            renderItem={(item, isHighlighted) =>
                                                <div className="menu-item" style={{ background: isHighlighted ? 'lightgray' : 'white' }} key={item.CompetitorInterchangesId}>
                                                    {item.CompetitorName}  {item.CompetitorPartNumber}
                                                </div>
                                            }
                                            renderMenu={(items, value) => (
                                                <div className="menu">
                                                    {value === '' ? (
                                                        <div className="item"><h6>Type ConMet assembly number</h6></div>
                                                    ) : this.state.loading ? (
                                                        <div className="item"><h6>Loading...</h6></div>
                                                    ) : items.length === 0 ? (
                                                        <div className="item"><h6>No matches for {value}</h6></div>
                                                    ) : items}
                                                </div>
                                            )}
                                        />
                                    </div>
								</div>
								<Link
                                    to={`/hub-selection/compare/${this.state.assembly1}/${this.state.assembly2}`}
									className="general-button"
								>
									Compare
								</Link>
						</div>
					</div>

        )
    }
};

export default connect()(CompareHub)
