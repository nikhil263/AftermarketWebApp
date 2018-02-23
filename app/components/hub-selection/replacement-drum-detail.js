import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import Waiting from 'components/global/waiting';
import { fetchDrumDetail } from 'actions';
import NoResults from '../global/no-result';
import { IMAGE_CDN } from 'config/constants';

class ReplacementDrumDetail extends React.Component {
    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);

        this.state = {
          drumId: null,
        };
    }

    componentWillMount() {
        const {params} = this.props;
        if (params.id) {
            this.setState({ drumId: params.id });
            this.getData(params.id);
        }
    }

    getData(id) {
        const {dispatch} = this.props;
        dispatch(fetchDrumDetail(id));
    }

    componentWillReceiveProps(newProps) {
        const {params} = newProps;
        if (params.id && this.state.drumId !== params.id) {
            this.setState({ drumId: params.id });
            this.getData(params.id);
        }
    }

    render() {
        const { results, history } = this.props;
        const drumDetail = results.drumDetail;

        if (results.isFetching) {
            return (<Waiting />)
        }

        if (drumDetail.length === 0) {
            return (<NoResults />)
        }

        return (
			<div className="grid-container main-content">
				<h2>Product Details</h2>
                {
                    drumDetail.map((item) => {
                        return (
							<div key={item.BrakeDrumNumber}>
								<div className="mb-3">
									<img className="product-image"  src={IMAGE_CDN+item.Images[0].ImageGuid+'.png'} />
								</div>
								<div className="specs mb-3">
									<h2>Product Specs</h2>
									<table>
										<tbody>
											<tr>
												<td>Drum Number</td>
												<td>{item.BrakeDrumNumber}</td>
											</tr>
											<tr>
												<td>Status</td>
												<td>{item.Status}</td>
											</tr>
											<tr>
												<td>Type</td>
												<td>{item.BrakeDrumType}</td>
											</tr>
											<tr>
                                                <td><span className="badge">A</span>Size - Diameter</td>
												<td>Ø {item.BrakeSizeDiameterInch} inch</td>
											</tr>
											<tr>
                                                <td><span className="badge">B</span>Shoe Width</td>
												<td>{item.BrakeSizeWidthInch} inch</td>
											</tr>
											<tr>
                                                <td><span className="badge">C</span>Pilot Diameter</td>
												<td>Ø {item.PilotDiameterInch} inch</td>
											</tr>
											<tr>
                                                <td><span className="badge">D</span>Overall Depth</td>
												<td>{item.DepthInch} inch</td>
											</tr>
											<tr>
                                                <td><span className="badge">E</span>Surface - Width</td>
												<td>{item.DrumSurfaceWidthInch} inch</td>
											</tr>
											<tr>
                                                <td><span className="badge">F</span>Flange Thickness</td>
												<td>{item.ThicknessInch} inch</td>
											</tr>
											<tr>
                                                <td><span className="badge">G</span>Bolt Circle Diameter</td>
												<td>Ø{item.BoltCircleDiameterInch} inch</td>
											</tr>
											<tr>
                                                <td><span className="badge">H</span>Bolt Hole Diameter</td>
												<td>Ø{item.BoltHoleDiameterInch} inch</td>
											</tr>
											<tr>
												<td>Number of Holes</td>
												<td>{item.WheelStudHoleCount}</td>
											</tr>
											<tr>
												<td>Ball Seat Nut Compatible</td>
												<td>{item.IsBsnCompatible ? 'Yes': 'No'}</td>
											</tr>
											<tr>
												<td>Weight (lbs.)</td>
												<td>{item.WeightPound} Lbs</td>
											</tr>
										</tbody>
									</table>
								</div>
                                {
                                    item.Notes && item.Notes.length ?
                                        <div className="specs mb-3">
                                            <h2>Notes</h2>
                                            <table>
                                                <tbody>
                                                {
                                                    item.Notes.map((n, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{n}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                                </tbody>
                                            </table>
                                        </div> : ''
                                }

                                {
                                    item.Interchanges && item.Interchanges.length ?
                                    <div className="specs mb-3">
                                        <table>
                                            <tbody>
                                            <tr>
                                                <td className="text-center">Interchangeable drums</td>
                                                <td className="text-right">BSN compatible</td>
                                            </tr>
                                            </tbody>
                                            <tbody>
                                            {
                                                item.Interchanges.map((item, index) => {
                                                    return (
                                                        <tr key={`${index} ${item.BrakeDrumNumber}`}>
                                                            <td><Link to={"/hub-selection/replacement-drum/drumdetails/"+item.BrakeDrumNumber}>{item.BrakeDrumNumber}</Link></td>
                                                            <td>{item.Type}</td>
                                                            <td>{item.WeightPound} Lbs</td>
                                                            <td>{item.IsBestMatch ? 'Best Match' : ''}</td>
                                                            <td>{item.IsBsnCompatible ? 'Yes' : 'No'}</td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                            </tbody>
                                        </table>
                                    </div> : ''
                                }
                                <a href="javascript:void(0)" onClick={history.goBack.bind(this)} className="general-button">Return to results</a>
							</div>
                        )
                    })
                }
			</div>
        );
    }
}
export default connect()(ReplacementDrumDetail)
