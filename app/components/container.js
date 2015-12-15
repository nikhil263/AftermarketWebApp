import React, { PropTypes, Component } from 'react';

import Navigation from 'components/navigation'


export default class extends Component {

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
