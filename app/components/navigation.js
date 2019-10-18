import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'
import { pushPath } from 'redux-simple-router'
import {resetFilters} from 'actions'
import {slide} from 'react-burger-menu';

var Menu = slide;

class Navigation extends Component {
	constructor(props) {
		super(props);
        this.state = {isOpen: false, count: '0'};
	}

	componentDidMount(){
        let count = JSON.parse(localStorage.getItem('unseenNotificationsCount'));
        this.setState({count})
	}

    componentWillReceiveProps(newProps) {
        let count = JSON.parse(localStorage.getItem('unseenNotificationsCount'));
        this.setState({count});
    }

	goHome() {
		const {dispatch} = this.props;
		dispatch(resetFilters());
		dispatch(pushPath('/hub-selection'))
	}

	goDisclaimer() {
		const {dispatch} = this.props;
		dispatch(resetFilters());
		dispatch(pushPath('/disclaimer'));
		this.setState({
            isOpen: false
		});
	}
	goCompareHub() {
		const{dispatch} = this.props;
        dispatch(resetFilters());
		dispatch(pushPath('/hub-selection/compare-hub'));
        this.setState({
            isOpen: false
        });
	}

    goNotification() {
        const {dispatch} = this.props;
        dispatch(resetFilters());
        dispatch(pushPath('/notification'));
        this.setState({
            isOpen: false
        });
    }
    handleStateChange(state){
        let count = JSON.parse(localStorage.getItem('unseenNotificationsCount'));
		this.setState({isOpen: state.isOpen, count})
	}

	render() {
		const {count} = this.state;
		return (
			<div>
				<Menu className="global-navigation" right isOpen={this.state.isOpen} onStateChange={(state)=>this.handleStateChange(state)}>
					<p>More Information</p>
					<ul>
						<li><a href="https://conmet.com/support/">Contact ConMet</a></li>
						<li><a href="http://www.conmet.com/">Visit ConMet.com</a></li>
						<li><a href="http://www.conmet.com/general/literature/">Service Literature</a></li>
						<li><a href="http://calculator.conmetwheelends.com/">Calculators</a></li>
						<li><a onClick={this.goDisclaimer.bind(this)}>Disclaimer</a></li>
                        <li><a onClick={this.goNotification.bind(this)}>Notification {count > 0 ? <span className="note-count">{count}</span> : null}</a></li>
						<li><a href="https://www.conmet.com/training">Hub Training 2.0</a></li>
						<li><a href="https://conmet.com/privacy/" target="_blank">Privacy Policy</a></li>
					</ul>
				</Menu>

				<div className="dark title-bar">


					<div className="left title">
						<div id="logo"><a href="#" onClick={this.goHome.bind(this)}><img src={require('../images/logo.svg')} alt="ConMet"/></a></div>
					</div>

					{count > 0 ?
                        <span className="right">
							<div className='note-dot'> </div>
						</span> : null
					}
				</div>
			</div>

		);
	}
}
function select(state) {
    return {
        notifications: state.results.notifications
    }
}
export default connect(select)(Navigation)
