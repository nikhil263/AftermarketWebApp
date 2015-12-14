import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom'

import Root from 'components/root'

import 'styles/app.scss';


// class Contact extends Component {
//   render() {
//     return <div>Contact</div>;
//   }
// }
//
// class About extends Component {
//   render() {
//     return ( <div>About</div> );
//   }
// }
// class Root extends Component {
//   render() {
//     return (
// 			<h2>Whats Up</h2>
//     );
//   }
// }

render(<Root />, document.getElementById('app'))
