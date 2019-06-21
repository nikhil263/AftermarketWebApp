import React, {PropTypes, Component} from 'react';
import {pushPath} from 'redux-simple-router';
import {connect} from 'react-redux';

class Start extends Component {
  static contextTypes = {
    store: PropTypes.object,
    history: PropTypes.object
  };

  handleClick(path) {
    const {dispatch} = this.props;
    dispatch(pushPath(path));
  }

  render() {
    return (
      <div className="grid-container main-content">
        <h2>What are you looking for?</h2>
        <div className="btn-no-description conmet-button">
          <button onClick={this.handleClick.bind(this, '/hub-selection/choose-path')} store={this.context.store}>
            <h2>HUBS <i className="icon-angle-right" /></h2>
          </button>
        </div>
        <div className="btn-no-description conmet-button">
          <button onClick={this.handleClick.bind(this, '/parts/choose-path')} store={this.context.store}>
            <h2>HUB COMPONENTS <i className="icon-angle-right" title="Right Arrow" /></h2>
          </button>
        </div>
        <div className="btn-no-description conmet-button">
          <button onClick={this.handleClick.bind(this, '/hub-selection/replacement-drum')} store={this.context.store}>
            <h2>BRAKE DRUMS <i className="icon-angle-right" /></h2>
          </button>
        </div>
        <div className="btn-no-description conmet-button">
          <button onClick={this.handleClick.bind(this, '/hub-selection/replacement-rotor')} store={this.context.store}>
            <h2>BRAKE ROTORS <i className="icon-angle-right" title="Right Arrow" /></h2>
          </button>
        </div>
        {/*<div className="btn-no-description conmet-button">*/}
          {/*<button onClick={this.handleClick.bind(this, '/hub-selection/stud/filter')} store={this.context.store}>*/}
            {/*<h2>STUD SEARCH <i className="icon-angle-right" title="Right Arrow" /></h2>*/}
          {/*</button>*/}
        {/*</div>*/}
          <p className="terms-and-conditions">In using this application you are acknowledging that you have read and understand ConMet's <a href='/ConMet-Terms-And-Conditions.pdf' target='_blank' style={{textDecorationLine: 'underline'}} >terms and conditions</a> </p>
      </div>
    )
  }
}

export default connect()(Start)
