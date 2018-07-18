import React from 'react';
import { connect } from 'react-redux';
import Waiting from 'components/global/waiting';
import { fetchDrumResult } from 'actions';
import NoResults from '../global/no-result';
import DrumResult from './drumResult';

class ReplacementDrumResult extends React.Component {
	componentWillMount() {
		const {dispatch, params} = this.props;
		if (params.drumId) {
			dispatch(fetchDrumResult(params.drumId));
		}

	}

	render() {
		const { results } = this.props;
		const drumResult = results.drumResult;

		if (results.isFetching) {
			return (<Waiting />)
		}

		if (drumResult.length === 0 && results.isZeroResults === true) {
			return (<NoResults />)
		}

        return (
            <DrumResult drumResult={drumResult} />
		)
	}
}
export default connect()(ReplacementDrumResult)
