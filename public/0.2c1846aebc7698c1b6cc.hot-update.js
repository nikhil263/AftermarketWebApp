webpackHotUpdate(0,{

/***/ 299:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(77), RootInstanceProvider = __webpack_require__(85), ReactMount = __webpack_require__(87), React = __webpack_require__(139); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	var React = __webpack_require__(139);
	var Router = __webpack_require__(244);
	var UserProfile = __webpack_require__(300);
	var Repos = __webpack_require__(301);
	var Notes = __webpack_require__(302);
	var ReactFireMixin = __webpack_require__(304);
	var Firebase = __webpack_require__(305);

	var Profile = React.createClass({
		displayName: 'Profile',

		mixins: [Router.State, ReactFireMixin],
		getInitialState: function getInitialState() {
			return {
				notes: ['note1', 'note2'],
				bio: { name: 'Nathanael' },
				repos: [1, 2, 3]
			};
		},
		componentDidMount: function componentDidMount() {
			this.ref = new Firebase('https://luminous-heat-7697.firebaseio.com');
			var childRef = this.ref.child(this.props.params.username);
			this.bindAsArray(childRef, 'notes');
		},
		componentWillUnmount: function componentWillUnmount() {
			this.unbind('notes');
		},
		render: function render() {
			var username = this.props.params.username;
			return React.createElement(
				'div',
				{ className: 'row' },
				React.createElement(
					'div',
					{ className: 'col-md-5' },
					React.createElement(UserProfile, { username: username, bio: this.state.bio })
				),
				React.createElement(
					'div',
					{ className: 'col-md-4' },
					React.createElement(Repos, { username: username, repos: this.state.repos })
				),
				React.createElement(
					'div',
					{ className: 'col-md-4' },
					React.createElement(Notes, { username: username, notes: this.state.notes })
				)
			);
		}
	});

	module.exports = Profile;

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(295); if (makeExportsHot(module, __webpack_require__(139))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "Profile.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)(module)))

/***/ }

})