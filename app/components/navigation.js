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
        <div className="left title">ConMet</div>
        <span className="right">
          <a href="#">
            <i className="icon-menu" title="Menu"></i>
          </a>
        </span>
      </div>
    );
  }
};
