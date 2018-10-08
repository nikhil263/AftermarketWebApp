import React from 'react';
import { connect } from 'react-redux';
import Waiting from 'components/global/waiting';
import { fetchRotorDetail } from 'actions';
import NoResults from '../global/no-result';
import { IMAGE_CDN } from 'config/constants';

class ReplacementRotorDetail extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);

    this.state = {
      rotorId: null,
    };
  }

  componentWillMount() {
    const {params} = this.props;
    if (params.id) {
      this.setState({ rotorId: params.id });
      this.getData(params.id);
    }
  }

  getData(id) {
    const {dispatch} = this.props;
    dispatch(fetchRotorDetail(id));
  }

  componentWillReceiveProps(newProps) {
    const {params} = newProps;
    if (params.id && this.state.rotorId !== params.id) {
      this.setState({ rotorId: params.id });
      this.getData(params.id);
    }
  }

  render() {
    const { results, history } = this.props;
    const rotorDetail = results.rotorDetail;

    if (results.isFetching) {
      return (<Waiting />)
    }

    if (rotorDetail.length === 0) {
      return (<NoResults />)
    }

    return (
      <div className="grid-container main-content">
        <h2>Product Details</h2>
        {
          rotorDetail.map((item) => {
            return (
              <div key={item.BrakeRotorNumber}>
                <div className="mb-3">
                  <img className="product-image"  src={IMAGE_CDN+item.Images[0].ImageGuid+'.png'} />
                </div>
                <div className="specs mb-3">
                  <h2>Product Specs</h2>
                  <table>
                    <tbody>
                    <tr>
                      <td>Brake Rotor Number</td>
                      <td>{item.BrakeRotorNumber}</td>
                    </tr>
                    <tr>
                      <td>Type</td>
                      <td>{item.BrakeRotorType}</td>
                    </tr>
                    <tr>
                      <td><span className="badge">A</span>Overall Length</td>
                      <td>Ø {item.OverallLength} inch</td>
                    </tr>
                    <tr>
                      <td><span className="badge">B</span>Brake Surface Outside Diameter</td>
                      <td>Ø{item.BrakeSurfaceOutsideDiameter} inch</td>
                    </tr>
                    <tr>
                      <td><span className="badge">C</span>Thickness</td>
                      <td> {item.Thickness} inch</td>
                    </tr>
                    <tr>
                      <td><span className="badge">D</span>Pilot Diameter</td>
                      <td>Ø {item.PilotDiameter} inch</td>
                    </tr>
                    <tr>
                      <td><span className="badge">E</span>Bolt Circle</td>
                      <td>Ø{item.BoltCircle} inch</td>
                    </tr>
                    <tr>
                      <td><span className="badge">F</span>Bolt Size</td>
                      <td>{item.BoltSize}</td>
                    </tr>
                    <tr>
                      <td>Bolt Hole No.</td>
                      <td>{item.BoltHoleNumber}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <a href="javascript:void(0)" onClick={history.goBack.bind(this)} className="general-button">Return to results</a>
              </div>
            )
          })
        }
      </div>
    );
  }
}
export default connect()(ReplacementRotorDetail)
