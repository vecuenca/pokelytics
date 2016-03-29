import React  from 'react';
import ReactDOM  from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { createHistory } from 'history';
import { Provider } from 'react-redux'
import { syncReduxAndRouter } from 'redux-simple-router'
import injectTapEventPlugin from 'react-tap-event-plugin';

// Components
import AppPage from './components/AppPage'
import Graph from './components/Graph'

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
		<Route path="/graphs" component={Graph}></Route>
		<Route path="/" component={AppPage}></Route>
	</Router>
)

ReactDOM.render(routes, document.querySelector('#main'));