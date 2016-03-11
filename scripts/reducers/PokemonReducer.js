import * as PokemonActionTypes from '../actions/PokemonActionTypes'

let PokemonReducer = function(state  = {
	pokemon: [],
	loaded: false,
	query: {}
}, action) {
	switch(action.type) {
		case PokemonActionTypes.REQUEST_POKEMON:
			return Object.assign({}, state, {
				loaded: false,
				query: action.query
			});
		case PokemonActionTypes.FETCHED_POKEMON:
			return Object.assign({}, state, {
				loaded: true,
				query: action.query,
				pokemon: action.pokemon
			});
		default:
			return state;
	}
}

export default PokemonReducer