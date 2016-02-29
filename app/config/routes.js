import React from 'react'
import {render} from 'react-dom'
import { Router, Route, RouteHandler, Redirect, IndexRoute } from 'react-router';

import Main from 'containers/main'
import App from 'containers/app'
import Splash from 'components/splash'
import HubSelectionWrapper from 'components/hub-selection'
import HubSelectionStart from 'components/hub-selection/start'
import HubSelectionChoosePath from 'components/hub-selection/choose-path'
import HubSelectionFindAssembly from 'components/hub-selection/find-assembly'
import HubSelectionFindAssemblyDetail from 'components/hub-selection/find-assembly-detail'
import HubSelectionSearch from 'components/hub-selection/search'
import HubSelectionResults from 'components/hub-selection/results'
import HubSelectionDetails from 'components/hub-selection/details'
import HubSelectionEmail from 'components/hub-selection/email'
import HubSelectionTruckType from 'components/hub-selection/truck-type'
import HubSelectionTruckMake from 'components/hub-selection/truck-make'
import HubSelectionAxelType from 'components/hub-selection/axel-type'
import HubSelectionGAWR from 'components/hub-selection/gawr'
import HubSelectionWheelType from 'components/hub-selection/wheel-type'
import HubSelectionAxleStud from 'components/hub-selection/axle-stud'
import HubSelectionMaterial from 'components/hub-selection/material'
import HubSelectionType from 'components/hub-selection/hub-type'
import HubFinder from 'components/hub-selection/finder'
import About from 'components/about'
import Contact from 'components/contact'



module.exports = (
		<Route path='/' component={Main}>
			<IndexRoute component={Splash} />
			<Route path='' component={App}>
			<Route path='about' component={About} />
			<Route path='contact' component={Contact} />
			<Route path='hub-selection' component={HubSelectionWrapper}>
				<IndexRoute component={HubSelectionStart} />
				<Route path='choose-path' component={HubSelectionChoosePath} />
				<Route path='search' component={HubSelectionSearch} />
				<Route path='search/:id' component={HubSelectionResults} />
				<Route path='results' component={HubSelectionResults} />
				<Route path='details/:id' component={HubSelectionDetails} />
				<Route path='email' component={HubSelectionEmail} />
				<Route path='finder' component={HubFinder} />
				<Route path='truck-type' component={HubSelectionTruckType} />
				<Route path='truck-make' component={HubSelectionTruckMake} />
				<Route path='axle-type' component={HubSelectionAxelType} />
				<Route path='gawr' component={HubSelectionGAWR} />
				<Route path='axle-stud' component={HubSelectionAxleStud} />
				<Route path='wheel-type' component={HubSelectionWheelType} />
				<Route path='material' component={HubSelectionMaterial} />
				<Route path='hub-type' component={HubSelectionType} />

				<Route path='find-assembly' component={HubSelectionFindAssembly} />
				<Route path='find-assembly-detail' component={HubSelectionFindAssemblyDetail} />
			</Route>
		</Route>
		</Route>

);
