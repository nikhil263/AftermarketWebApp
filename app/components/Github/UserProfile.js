var React = require('react');
var UserProfile = React.createClass({
	propTypes: {
		username: React.PropTypes.string.isRequired,
		bio: React.PropTypes.object.isRequired,
	},
	render: function() {
		return (
			<div>
			<h3> User {this.props.username} </h3>
			Username: {this.props.username} <br />
			Bio: {this.props.bio.name}
			</div>
		)
	}
});

module.exports = UserProfile;
