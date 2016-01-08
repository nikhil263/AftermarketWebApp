import React, { PropTypes, Component } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux'
import Spinner from 'components/global/spinner'


import Result from './details/result'
import ResultNavigation from './details/result-navigation'

class Waiting extends Component {
	render() {
		return (
			<div className="grid-container main-content">
				<h1>Receiving results</h1>
				<Spinner isFetching={true} />
			</div>
		)
	}
}



export default class extends Component {
	componentDidMount(){
		const { hub, searchForAssembly, results } = this.props
		searchForAssembly();
	}



	render() {
		const { results } = this.props
		console.log(results);
		if (results.isFetching) {
			return (<Waiting />)
		}
		return (
			<div className="grid-container main-content">
				<h1>Success! The following ConMet PreSet hub(s) are recommended</h1>


					{results.items.map((item, index) => {
						if (index === results.selectedIdx) {
							return <Result idx={results.selectedIdx} total={results.total} key={index} item={item} />
						}
					})}

					<ResultNavigation total={results.total} currentIdx={results.selectedIdx}/>

				{/*



					<Link to="/hub-selection/details" className="general-button">See Details</Link>
					<div className="conmet-button">
				<Link to="/hub-selection/step-three" className="yes-no-button">Find this Product</Link>
				</div>*/}
			</div>
		)
	}
};
