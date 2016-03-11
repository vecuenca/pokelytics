import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import {reducer as formReducer} from 'redux-form';

import PokemonReducer from './PokemonReducer'

const rootReducer = combineReducers({
	routing: routeReducer,
	form: formReducer,
	pokemon: PokemonReducer
})

export default rootReducer