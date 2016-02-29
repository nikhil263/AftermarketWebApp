import React, { PropTypes, Component } from 'react';
import {Link} from 'react-router';

export default class extends Component {
	render() {
		const { result } = this.props
		return (
				<div className="meta">
					<img className="product-image" src={require('../../../images/hub-fpo.png')} alt="Hub FPO" width="100" height="100"/>
					{result.Description}<br />
				<em>#{result.PartNumber}</em>
				</div>
			)
	}
};
