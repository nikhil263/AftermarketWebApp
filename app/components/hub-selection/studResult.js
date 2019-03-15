import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';

class StudResult extends React.Component {
  constructor(props) {
    super(props);
    this.prevData = this.prevData.bind(this);
    this.nextData = this.nextData.bind(this);
    this.setResultLength = this.setResultLength.bind(this);

    this.state = {
      selectedIndex: 0,
      resultsLength: 0,
    };
  }

  componentWillMount() {
    this.setResultLength(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setResultLength(nextProps);
  }

  setResultLength(props) {
    const {result} = props;
    this.setState({resultsLength: result ? result.length : 0});
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
    const {result} = this.props;
    if (result.length > 0) {
      // const data = result[this.state.selectedIndex];
      return (
        <div id="studResult">
          <h1>Success! The following ConMet Stud is recommended</h1>
          <div className="result">
            <div
              className={classNames('prev-button', {
                'hide-button': result.length <= 1 || this.state.selectedIndex === 0,
              })}
              onClick={this.prevData}
            >
              <i className="icon-angle-left"/>
            </div>
            {result.map((data, i) => (
              <div className="specs stud" key={i}>
                <table>
                  <tbody>
                  <tr>
                    <td>Stud Number</td>
                    <td>{data.StudNumber}</td>
                  </tr>
                  <tr>
                    <td>Chart Description</td>
                    <td>{data.ChartDescription}</td>
                  </tr>
                  <tr>
                    <td>Dimension A Inches</td>
                    <td>{data.DimensionA}</td>
                  </tr>
                  <tr>
                    <td>Dimension B Inches</td>
                    <td>{data.DimensionB}</td>
                  </tr>
                  <tr>
                    <td>Dimension C Inches</td>
                    <td>{data.DimensionC}</td>
                  </tr>
                  <tr>
                    <td>Dimension D Inches</td>
                    <td>{data.DimensionD}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            ))}
            <div
              className={classNames('next-button', {
                'hide-button': result.length <= 1 || result.length - 1 === this.state.selectedIndex,
              })}
              onClick={this.nextData}
            >
              <i className="icon-angle-right"/>
            </div>
          </div>
        </div>
      );
    } else {
      return <div/>;
    }
  }
}

export default connect()(StudResult);
