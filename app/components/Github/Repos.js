var React = require('react');
var Repos = React.createClass({
	propTypes: {
		username: React.PropTypes.string.isRequired,
		repos: React.PropTypes.array.isRequired
	},
	render: function() {
		return (
			<div>
			<h3> Repos for {this.props.username} </h3>
			Username: {this.props.username} <br />
			Repos: {this.props.repos}
			</div>
		)
	}
});

module.exports = Repos;
