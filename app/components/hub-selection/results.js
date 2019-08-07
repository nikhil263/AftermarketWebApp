import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux'
import Waiting from 'components/global/waiting'
import {MATERIAL_ALL, MATERIAL_ALUMINUM, MATERIAL_IRON} from 'config/constants'
import {fetchAssembly, getAppSearchParams} from 'actions/assembly'
import {materialFilter, fetchHubs, fetchHubsSpindleNut, fetchHubsCrossApi, invalidateHubStuds} from 'actions'
import {Link} from 'react-router';
import NoResults from '../global/no-result'
import Result from './details/hub-results';
import HubSingleResult from './details/result';
import ResultNavigation from './details/result-navigation'


class MaterialType extends Component {
  setFilter(filter) {
    const {dispatch} = this.props;
    dispatch(materialFilter(filter))
  }

  setActive(filter) {
    const {materialFilter} = this.props;
    const baseClass = 'conmet-button'
    if (materialFilter === filter) {
      return baseClass + ' active';
    }
    return baseClass;
  }

  render() {

    return (
      <div className="grid-container main-content">
        <h2>Choose the Hub Material</h2>

        <div className={this.setActive(MATERIAL_IRON)}>
          <button className="yes-no-button" onClick={this.setFilter.bind(this, MATERIAL_IRON)}><strong>Iron</strong>
          </button>
        </div>

        <div className={this.setActive(MATERIAL_ALUMINUM)}>
          <button className="yes-no-button" onClick={this.setFilter.bind(this, MATERIAL_ALUMINUM)}>
            <strong>Aluminum</strong>
          </button>
        </div>
      </div>
    )

  }
}

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      newResults: [],
      spindleNut: ""
    };
  }

  componentDidMount() {
    const {dispatch, app, params} = this.props;
    if (params.id) {
      dispatch(fetchHubs(params.id))
    } else {
      dispatch(fetchAssembly(app));
      const { wmslc } = app.filterState;
      if (wmslc && wmslc === 1) {
        let searchParams = getAppSearchParams(app).toLowerCase().replace('wmslc=1', 'wmslc=2');
        dispatch(fetchHubsCrossApi(searchParams, true));
      }
    }
  }

  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch(invalidateHubStuds());
  }

  componentWillReceiveProps(newProps) {
    const {results, dispatch} = newProps;
    this.state.newResults = results;
    if (!results.isFetching && !(results.items.length === 0) && results.items[0] && ((this.state.results.items === undefined) || (results.items[0].PartNumber !== this.state.results.items[0].PartNumber))) {
      this.setState({results: results});
      let partNumber = "";
      if (results.items && results.items.length) {
        results.items.map((item, id) => {
          partNumber += (id + 1 === results.items.length) ? item.HubAssemblyNumber : item.HubAssemblyNumber + ",";
        });
      }
      if (partNumber) {
        dispatch(fetchHubsSpindleNut(partNumber)).then(() => {
          let spindleNut = "";
          if (this.state.newResults.spindleNut !== undefined) {
            this.state.newResults.spindleNut[0].AftermarketParts.map((item, id) => {
              let washer_description = '';
              if (item.Description.toLowerCase().includes('hub service kit') && item.Description.toLowerCase().includes('ff')) {
                if (item.TypeId === 226) {
                  washer_description = ' (D Flat)';
                } else if (item.TypeId === 227) {
                  washer_description = ' (Keyway)';
                }
              }

              spindleNut += (id + 1 === this.state.newResults.spindleNut[0].AftermarketParts.length ? item.PartNumber + (washer_description) : item.PartNumber + (washer_description) + ",");
            });
            this.setState({spindleNut: spindleNut});
          }
        });
      }
    }
  }

  render() {
    const {results, materialFilter, dispatch, app} = this.props;
    if(app.filterState.aaxna === 82) {
        return (
            <div className="unitized">
                {/*<h2>Success! The following hub is recommended</h2>*/}
                <div className="result">
                    <div className="details">
                        <h2 style={{textTransform: 'none'}}>Volvo/Mack unitized hub assemblies can be identified by their 8-sided, thread-on hubcaps and parallel, closely-spaced bearings.</h2>

                        <div className="row">
                            <img
                                src={require('../../images/figure15.jpg')}
                                alt="Unitized"
                                width="200"
                                height="200"
                            />
                            <img
                                src={require('../../images/figure16.png')}
                                alt="Unitized"
                                width="200"
                                height="200"
                            />
                        </div>

                        <h2 style={{textTransform: 'none'}}>Volvo/Mack unitized hub assemblies are not serviceable, please contact your local Volvo/Mack dealer for service enquiries. </h2>
                        <div className="text-center disclaimer"><Link to="/disclaimer">ConMet Wheel End Disclaimer</Link></div>
                    </div>

                </div>
            </div>
        )
    }

    if (results.isFetching || results.isSpindleNutFetching) {
      return (<Waiting/>)
    }
    if (results.items.length === 0) {
      return (<NoResults/>)
    }
    if (materialFilter === MATERIAL_ALL && results.items.length > 1) {
      return <MaterialType dispatch={dispatch}/>
    }

    if ((results.items.length > 0) && (results.items.length === 2)) {
      const {short_studs} = results;
      return (
        <Result
          results={results.items}
          spindleNut={this.state.spindleNut}
          selectedHubAssemblyNumber={null}
          short_studs={short_studs}
        />
      )
    } else if (results.items.length > 0) {
      const {short_studs} = results;
      return (
        <div>
          {results.items.map((item, index) => {
            if (index === results.selectedIdx) {
              return (
                <HubSingleResult
                  idx={results.selectedIdx}
                  spindleNut={this.state.spindleNut}
                  total={results.total}
                  key={index}
                  item={item}
                  selectedHubAssemblyNumber={null}
                  short_studs={short_studs}
                />
              )
            }
          })}
          <ResultNavigation total={results.total} currentIdx={results.selectedIdx}/>
        </div>
      )
    } else {
      return (<div/>)
    }
  }
}

export default connect()(Results)
