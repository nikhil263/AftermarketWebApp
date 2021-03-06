import React from 'react';
import {connect} from 'react-redux';
import Waiting from 'components/global/waiting';
import {fetchRotorResult} from 'actions';
import NoResults from '../global/no-result';
import RotorDiscontinued from '../global/rotor-discontinued';
import RotorResult from './rotorResult';

class ReplacementRotorResult extends React.Component {
  componentWillMount() {
    const {dispatch, params} = this.props;
    if (params.rotorId) {
      dispatch(fetchRotorResult(params.rotorId));
    }
  }

  render() {
    const {results} = this.props;
    const {selectedRotorNumber, rotorResult} = results;
    if (results.isFetching) {
      return (<Waiting/>)
    }

    if (rotorResult.length === 0 && results.isZeroResults === true && selectedRotorNumber) {
      return (<RotorDiscontinued selectedRotorNumber={selectedRotorNumber}/>)
    }

    if (rotorResult.length === 0 && results.isZeroResults === true) {
      return (<NoResults/>)
    }

    return (
      <RotorResult rotorResult={rotorResult}/>
    )
  }
}

export default connect()(ReplacementRotorResult)
