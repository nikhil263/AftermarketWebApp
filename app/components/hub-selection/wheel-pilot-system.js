import React, { PropTypes, Component } from 'react';
import HubSelection from 'components/hub-selection';
import { pushPath } from 'redux-simple-router'
import { connect } from 'react-redux'
import Spinner from 'components/global/spinner'
import { setActiveFilterValue, fetchFilters } from 'actions/filters'

const FILTERIDX=5
const HUB_PILOT_FILTER_PATH = '/hub-selection/hub-pilot-type'
const WHEEL_STUD_STANDOUT_FILTER_PATH = '/hub-selection/wheel-stud-standout'

class Result extends Component {



	render () {
	 var { result, active, onClick } = this.props
	 var className = 'general-button truck-make'
	 return (
		 <div className="grid-content small-6">
			 <a href="#" className={active()} onClick={onClick}>{result.Name}</a>
		 </div>
	 )
 	}
}

class WheelPilotSystem extends Component {

	componentDidMount() {

		const { dispatch, app, checkForReload,  setFilter} = this.props
		dispatch(fetchFilters(FILTERIDX, app))

	}


	render() {
		const { app, setFilter, setActive } = this.props;
		if (app.isFetching || app.filterResults.length < 1) {
			return <Spinner isFetching={app.isFetching} />
		}
		return (
			<div className="grid-container main-content">
				<h2>Wheel Pilot System</h2>
				<div className="grid-block">
					{app.filterResults.map((result, index) => {

						var boundClick = result.Id == 2 ? setFilter.bind(this, FILTERIDX, {whlps: result.Id}, app.NEXT_FILTER_PATH = HUB_PILOT_FILTER_PATH ): setFilter.bind(this, FILTERIDX, {whlps: result.Id}, app.NEXT_FILTER_PATH = WHEEL_STUD_STANDOUT_FILTER_PATH );
						
						var boundActive = setActive.bind(this, FILTERIDX, result.Id, 'general-button truck-make');
						return <Result key={index} app={app} result={result} active={boundActive} onClick={boundClick}/>
					})}
				</div>
                <div className="grid-block">
				<div className="grid-content small-6">
                        <h4>Hub Pilot Wheel Mounting</h4>
                        <p>Also known as Uni-Mount-10 ™. Uses the pilots on the hub to locate the wheels. Single two-piece flange nut on each wheel stud.</p>
                    </div>
                    <div className="grid-content small-6">
                        <h4>Stud Pilot Wheel Mounting</h4>
                        <p>Also known as Ball Seat Nut. Uses the spherical seat of the nut to locate the wheels. Dual wheels use a double cap nut system.</p>
                    </div>
                    <div className="grid-content small-6">
                        <img src={require('../../images/SERV_106821a_NoNumber.png')} alt="SERV_106821a_NoNumber"/>
                    </div>
                    <div className="grid-content small-6">
                        <img src={require('../../images/SERV_106822a_NoNumber.png')} alt="SERV_106822a_NoNumber"/>
                    </div>

                </div>
			</div>
		)
	}
}
export default connect()(WheelPilotSystem)
