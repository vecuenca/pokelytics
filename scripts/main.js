import React  from 'react';
import ReactDOM  from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { createHistory } from 'history';
import { Provider } from 'react-redux'
import { syncReduxAndRouter } from 'redux-simple-router'
import injectTapEventPlugin from 'react-tap-event-plugin';

// Components
import Home from './components/Home'

import configureStore from './store/configureStore'

const store = configureStore()
const history = createHistory();

syncReduxAndRouter(history, store)
 
/* 
	Needed for on touch tap
*/
injectTapEventPlugin();

/*  
  Routes
*/
var routes = (
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={Home}></Route>
		</Router>
  	</Provider>
)

ReactDOM.render(routes, document.querySelector('#main'));