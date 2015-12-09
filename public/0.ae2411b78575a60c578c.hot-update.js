webpackHotUpdate(0,{

/***/ 290:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(77);

	var NotesList = React.createClass({
	    displayName: 'NotesList',

	    render: function render() {
	        var notes = this.props.notes.map(function (note, index) {
	            return React.createElement(
	                'li',
	                { className: 'list-group-item', key: index },
	                ' ',
	                React.createElement(
	                    'strong',
	                    null,
	                    note['.value']
	                ),
	                ' '
	            );
	        });
	        return React.createElement(
	            'ul',
	            { className: 'list-group' },
	            notes
	        );
	    }
	});

	module.exports = NotesList;

/***/ }

})