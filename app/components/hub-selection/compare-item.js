import React, {Component} from 'react';
import _ from 'lodash';

class CompareItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };
  }

  componentWillMount() {
    const {isDifferent} = this.props;
    this.setState({active: isDifferent});
  }

  componentWillReceiveProps(newProps) {
    const {isDifferent} = newProps;

    if (isDifferent !== this.props.isDifferent) {
      this.setState({active: isDifferent});
    }
  }

  toggleActive = () => {
    this.setState({active: !this.state.active});
  };

  render() {
    const {item, nextItem, property, index, isDifferent, label} = this.props;
    const {active} = this.state;

    return (
      <div className={`accordion-item ${active ? 'is-active' : ''} compare-item`}
           style={{order: isDifferent ? (40 - index) : '-1'}}>
        <div className="accordion-title" onClick={this.toggleActive}>
          {label}
          <span className="rebuild-kit-toggle show pointer"/>
        </div>
        <div className="accordion-content">
          <div className="content">
            <div className="small-6">{_.isBoolean(item[property]) ? (item[property] ? 'true' : 'false') : item[property]}</div>
            <div className="small-6">{_.isBoolean(nextItem[property]) ? (nextItem[property] ? 'true' : 'false') : nextItem[property]}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default CompareItem;
