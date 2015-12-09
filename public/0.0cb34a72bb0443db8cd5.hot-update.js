webpackHotUpdate(0,{

/***/ 284:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(77);
	var Main = React.createClass({
	    displayName: "Main",

	    render: function render() {
	        return React.createElement(
	            "div",
	            { className: "main-container" },
	            React.createElement(
	                "nav",
	                { className: "navbar navbar-default", role: "navigation" },
	                React.createElement(
	                    "div",
	                    { className: "col-sm-7 col-sm-offset-2", style: { marginTop: 15 } },
	                    "MENU 2"
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "container" },
	                this.props.children
	            )
	        );
	    }
	});

	module.exports = Main;

/***/ }

})