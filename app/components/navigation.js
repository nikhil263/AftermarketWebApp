import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <div className="dark title-bar">
        <div className="left title">
          <div id="logo"><Link to="/hub-selection"><img src={require('../images/logo.svg')} alt="ConMet"/></Link></div>
        </div>
        <span className="center">
          <h2>Hub Selection</h2>
        </span>
        <span className="right">
          <a href="#">
            <i className="icon-menu" title="Menu"></i>
          </a>
        </span>
      </div>
    );
  }
};
