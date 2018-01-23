import React from 'react';
import { connect } from 'react-redux';
import Waiting from 'components/global/waiting';
import { fetchDrumDetail } from 'actions';
import NoResults from '../global/no-result';
import { IMAGE_CDN } from 'config/constants';

class ReplacementDrumDetail extends React.Component {

    componentWillMount() {
        const {dispatch, params} = this.props;
        if (params.id) {
            dispatch(fetchDrumDetail(params.id));
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
												<td>Size - Diameter</td>
												<td>Ø {item.BrakeSizeDiameterInch} inch</td>
											</tr>
											<tr>
												<td>Shoe Width</td>
												<td>{item.BrakeSizeWidthInch} inch</td>
											</tr>
											<tr>
												<td>Pilot Diameter</td>
												<td>Ø {item.PilotDiameterInch} inch</td>
											</tr>
											<tr>
												<td>Overall Depth</td>
												<td>{item.DepthInch} inch</td>
											</tr>
											<tr>
												<td>Surface - Width</td>
												<td>{item.DrumSurfaceWidthInch} inch</td>
											</tr>
											<tr>
												<td>Flange Thickness</td>
												<td>{item.ThicknessInch} inch</td>
											</tr>
											<tr>
												<td>Bolt Circle Diameter</td>
												<td>Ø{item.BoltCircleDiameterInch} inch</td>
											</tr>
											<tr>
												<td>Bolt Hole Diameter</td>
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
												<td>{item.WeightPound} pound</td>
											</tr>
										</tbody>
									</table>
								</div>

								<div className="specs mb-3">
									<h2>Notes</h2>
									<table>
										<tbody>
										{
											item.Notes.map((n, index) => {
												return (
													<tr key={index}><td>{n}</td></tr>
												)
											})
										}
										</tbody>
									</table>
								</div>

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
                                                            <td>{item.BrakeDrumNumber}</td>
                                                            <td>{item.Type}</td>
                                                            <td>{item.WeightPound} pound</td>
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
