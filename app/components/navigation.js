import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux'
import { pushPath } from 'redux-simple-router'
import {resetFilters} from 'actions'
import Trigger from 'react-foundation-apps/lib/trigger';
import Offcanvas from 'react-foundation-apps/lib/offcanvas';

class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  goHome() {
    const {dispatch} = this.props
    dispatch(resetFilters())
    dispatch(pushPath('/hub-selection'))
  }

  render() {
    return (
      <div>
        <Offcanvas id="top-offcanvas" position="top" className="global-navigation">
          <Trigger close="">
            <a className="close-button"><i className="icon-angle-up"></i></a>
          </Trigger>

          <ul>
            <li><a href="http://www.conmet.com/contact-us/">Contact ConMet</a></li>
            <li><a href="http://www.conmet.com/">Visit ConMet.com</a></li>
            <li><a href="http://store.conmet.com/locator/">Dealer Locator</a></li>
            <li><a href="http://store.conmet.com/">Product Showroom</a></li>
          </ul>

            <Trigger close="">
              <a className='button'>Close <i className="icon-angle-up"></i></a>
            </Trigger>
        </Offcanvas>
        <div className="dark title-bar">


          <div className="left title">
            <div id="logo"><a href="#" onClick={this.goHome.bind(this)}><img src={require('../images/logo.svg')} alt="ConMet"/></a></div>
          </div>
          <span className="center">
            <h2>Hub Selection</h2>
          </span>
          <span className="right">
            <Trigger open="top-offcanvas">
              <a className="button"><i className="icon-menu" title="Menu"></i></a>
            </Trigger>
          </span>
        </div>
      </div>

    );
  }
};
export default connect()(Navigation)
