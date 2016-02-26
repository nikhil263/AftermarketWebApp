import React, { PropTypes, Component } from 'react';

import Navigation from 'components/navigation'

import {fetchCategories} from 'actions/categories'
import {connect} from 'react-redux'



class Main extends Component {
  static childContextTypes = {
    store: PropTypes.object,
    history: PropTypes.object
  }

  

  getChildContext() {
    return {
      store: this.store,
      history: this.history
    }
  }

  constructor(props, context) {
    super(props,context)
    this.store = context.store;
    this.history = props.history;
  }



  static contextTypes = {
    store: React.PropTypes.object,
    history: React.PropTypes.object
  };

  render() {
    var childrenWithProps = React.Children.map(this.props.children, function(child) {
            return React.cloneElement(child, { history: history });
    });
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
export default connect()(Main)
