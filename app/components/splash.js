import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'

class Splash extends Component {
    constructor(props) {
        super(props)
        this.state = { history: props.history }
    }

    componentWillMount(){
        const { dispatch } = this.props;
        dispatch(pushPath('/hub-selection'))
    }

    render() {
        return(<div>splash</div>)
    }
};
export default connect()(Splash)
