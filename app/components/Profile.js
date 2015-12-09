var React = require('react');
var Router = require('react-router');
var UserProfile = require('./Github/UserProfile');
var Repos = require('./Github/Repos');
var Notes = require('./Notes/Notes');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
var _ = require('lodash');

var Profile = React.createClass({
	mixins: [Router.State, ReactFireMixin],
	getInitialState: function() {
		return {
			notes: [],
			bio: {name: 'Nathanael'},
			repos: [1,2,3]
		}
	},
	componentDidMount: function() {
		this.ref = new Firebase('https://luminous-heat-7697.firebaseio.com');
		var childRef = this.ref.child(this.props.params.username);
		this.bindAsArray(childRef, 'notes');

	},
	componentWillUnmount: function() {
		this.unbind('notes');
	},
	handleAddNote: function(newNote) {
		var noteArr = [];
    this.state.notes.forEach(function(note, i){
       noteArr.push(_.pick(note, '.value'));
    });
    noteArr.push(newNote);
    this.ref.child(this.props.params.username).set(noteArr);
	},
	render: function() {
		var username = this.props.params.username;
	    return (
	      <div className="row">
	        <div className="col-md-4">
	          <UserProfile username={username} bio={this.state.bio} />
	        </div>
	        <div className="col-md-4">
	          <Repos username={username} repos={this.state.repos} />
	        </div>
	        <div className="col-md-4">
	          <Notes
							username={username}
							notes={this.state.notes}
							addNote={this.handleAddNote}/>
	        </div>
	      </div>
	    )
	  }
})


module.exports = Profile;
