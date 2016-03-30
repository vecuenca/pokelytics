import React  from 'react';
import ReactDOM  from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { createHistory } from 'history';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Components
import AppPage from './components/AppPage'
import Graph from './components/Graph'
import Popularity from './components/Popularity'

const history = createHistory();
 
/* 
	Needed for on touch tap
*/
injectTapEventPlugin(); 

/*  
  Routes
*/
var routes = (
	<Router history={history}>
		<Route path="/popularity" component={Popularity}></Route>
		<Route path="/graphs" component={Graph}></Route>
		<Route path="/" component={AppPage}></Route>
	</Router>
)

ReactDOM.render(routes, document.querySelector('#main'));