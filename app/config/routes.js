import React from 'react'
import {Route, RouteHandler, IndexRoute} from 'react-router';

import Main from 'containers/main'
import App from 'containers/app'
import Splash from 'components/splash'
import HubSelectionWrapper from 'components/hub-selection'
import HubSelectionStart from 'components/hub-selection/start'
import HubSelectionChoosePath from 'components/hub-selection/choose-path'
import ReplacementDrum from 'components/hub-selection/replacement-drum'
import ReplacementRotor from 'components/hub-selection/replacement-rotor'
import ReplacementDrumFilter from 'components/hub-selection/replacement-drum-filter'
import ReplacementRotorFilter from 'components/hub-selection/replacement-rotor-filter'
import StudFilter from 'components/hub-selection/stud-filter'
import ReplacementDrumSearch from 'components/hub-selection/replacement-drum-search'
import ReplacementRotorSearch from 'components/hub-selection/replacement-rotor-search'
import ReplacementDrumResult from 'components/hub-selection/replacement-drum-result'
import ReplacementRotorResult from 'components/hub-selection/replacement-rotor-result'
import ReplacementDrumDetail from 'components/hub-selection/replacement-drum-detail'
import ReplacementRotorDetail from 'components/hub-selection/replacement-rotor-detail'
import HubSelectionFindAssembly from 'components/hub-selection/find-assembly'
import HubSelectionFindAssemblyDetail from 'components/hub-selection/find-assembly-detail'
import HubSelectionSearch from 'components/hub-selection/search'
import Filters from 'components/hub-selection/filters'
import NotAvailableHub from 'components/hub-selection/not-available-hub'
import CompareAssembly from 'components/hub-selection/compare-assembly'
import HubSelectionResults from 'components/hub-selection/results'
import HubSelectionDetails from 'components/hub-selection/details'
import HubSelectionEmail from 'components/hub-selection/email'
import HubSelectionTruckType from 'components/hub-selection/truck-type'
import HubSelectionTruckMake from 'components/hub-selection/truck-make'
import HubSelectionAxelType from 'components/hub-selection/axel-type'
import HubSelectionMountingSystem from 'components/hub-selection/hub-mounting-system'
import HubSelectionGAWR from 'components/hub-selection/gawr'
import HubSelectionWheelType from 'components/hub-selection/wheel-type'
import HubSelectionAxleStud from 'components/hub-selection/axle-stud'
import HubSelectionMaterial from 'components/hub-selection/material'
import HubSelectionType from 'components/hub-selection/hub-type'
import BrakeRotorFlange from 'components/hub-selection/brake-rotor-flange'
import BrakeRotorType from 'components/hub-selection/brake-rotor-type'
import HubFinder from 'components/hub-selection/finder'
import About from 'components/about'
import Contact from 'components/contact'
import Disclaimer from 'components/disclaimer'
import NoResults from '../components/global/no-result';


import PartsWrapper from 'components/parts'
import PartsSearch from 'components/parts/search'
import PartsResults from 'components/parts/results'
import PartsHelp from 'components/parts/help'
import PartsHelpDetail from 'components/parts/help-detail'
import PartsChoosePath from 'components/parts/choose-path'
import MobileHelpDetail from 'components/mobile-help.js'

module.exports = (
  <Route path='/' component={Main}>
    <IndexRoute component={Splash}/>
    <Route path='' component={App}>
      <Route path='about' component={About}/>
      <Route path='contact' component={Contact}/>
      <Route path='disclaimer' component={Disclaimer}/>
      <Route path='hub-selection' component={HubSelectionWrapper}>
        <IndexRoute component={HubSelectionStart}/>
        <Route path='replacement-rotor' component={ReplacementRotor}/>
        <Route path='replacement-rotor/filter' component={ReplacementRotorFilter}/>
        <Route path='stud/filter' component={StudFilter}/>
        <Route path='stud/filter/:currentFilter' component={StudFilter}/>
        <Route path='stud/filter/:currentFilter/:filters' component={StudFilter}/>
        <Route path='replacement-rotor/filter/:currentFilter/:filters' component={ReplacementRotorFilter}/>
        <Route path='replacement-rotor/filter/:currentFilter' component={ReplacementRotorFilter}/>
        <Route path='replacement-rotor/search' component={ReplacementRotorSearch}/>
        <Route path='replacement-rotor/recommended-rotors/:rotorId' component={ReplacementRotorResult}/>
        <Route path='replacement-rotor/rotordetails/:id' component={ReplacementRotorDetail}/>
        <Route path='replacement-drum' component={ReplacementDrum}/>
        <Route path='replacement-drum/filter' component={ReplacementDrumFilter}/>
        <Route path='replacement-drum/filter/:currentFilter/:filters' component={ReplacementDrumFilter}/>
        <Route path='replacement-drum/filter/:currentFilter' component={ReplacementDrumFilter}/>
        <Route path='replacement-drum/search' component={ReplacementDrumSearch}/>
        <Route path='replacement-drum/recommended-drums/:drumId' component={ReplacementDrumResult}/>
        <Route path='replacement-drum/drumdetails/:id' component={ReplacementDrumDetail}/>
        <Route path='choose-path' component={HubSelectionChoosePath}/>
        <Route path='search' component={HubSelectionSearch}/>
        <Route path='filters/:filters' component={Filters}/>
        <Route path='not-available/:id' component={NotAvailableHub}/>
        <Route path='compare/:assembly/:compareAssembly' component={CompareAssembly}/>
        <Route path='results' component={HubSelectionResults}/>
        <Route path='details/:id' component={HubSelectionDetails}/>
        <Route path='email' component={HubSelectionEmail}/>
        <Route path='finder' component={HubFinder}/>
        <Route path='truck-type' component={HubSelectionTruckType}/>
        <Route path='truck-make' component={HubSelectionTruckMake}/>
        <Route path='axle-type' component={HubSelectionAxelType}/>
        <Route path='hub-mounting-system' component={HubSelectionMountingSystem}/>
        <Route path='gawr' component={HubSelectionGAWR}/>
        <Route path='axle-stud' component={HubSelectionAxleStud}/>
        <Route path='wheel-type' component={HubSelectionWheelType}/>
        <Route path='material' component={HubSelectionMaterial}/>
        <Route path='hub-type' component={HubSelectionType}/>
        <Route path='brake-rotor-flange' component={BrakeRotorFlange}/>
        <Route path='brake-rotor-type' component={BrakeRotorType}/>
        <Route path='find-assembly' component={HubSelectionFindAssembly}/>
        <Route path='find-assembly-detail' component={HubSelectionFindAssemblyDetail}/>
        <Route path='no-results' component={NoResults}/>
      </Route>
      <Route path='parts' component={PartsWrapper}>
        <Route path='choose-path' component={PartsChoosePath}/>
        <Route path='search' component={PartsSearch}/>
        <Route path='search/:id' component={PartsResults}/>
        <Route path='help' component={PartsHelp}/>
        <Route path='help/detail' component={PartsHelpDetail}/>
      </Route>
    </Route>
    <Route path='mobile-help' component={MobileHelpDetail}/>
  </Route>
);
