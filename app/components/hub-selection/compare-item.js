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
    const {isDifferent, property} = this.props;
    this.setState({active: property === 'Status' ? true : isDifferent});
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

  changeProperty(item, property){
    let value = null;
    if(_.isBoolean(item)){
      value = item ? 'Yes' : 'No';
    }else if(property === "HubRatingPound"){
      value = Math.round(item).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }else{
      value = item;
    }

    return value;
  }

  render() {
    const {item, nextItem, property, index, isDifferent, label} = this.props;
    const {active} = this.state;

    return (
      <div className={`accordion-item ${active ? 'is-active' : ''} compare-item`}
           style={{order: (isDifferent || property === 'Status') ? (40 - index) : '-1'}}>
        <div className="accordion-title" onClick={this.toggleActive}>
          {label}
          <span className="rebuild-kit-toggle show pointer"/>
        </div>
        <div className="accordion-content">
          <div className="content">
            <div className="small-6">{this.changeProperty(item[property], property)}</div>
            <div className="small-6">{this.changeProperty(nextItem[property], property)}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default CompareItem;
