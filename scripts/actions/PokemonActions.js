import request from 'superagent';
import * as PokemonActionTypes from './PokemonActionTypes'

export function getAll(query = {}) {
	return (dispatch, getState) => {
		request
			.get('/api/pokemon/')
			.send()
			.end((err, res) => {
				if (err || !res.ok) {
					dispatch({
						type: PokemonActionTypes.FETCHED_POKEMON,
						pokemon: err.response.text,
						query: query
					})
				} else {
					dispatch({
						type: PokemonActionTypes.FETCHED_POKEMON,
						pokemon: res.text,
						query: query
					})
				}
			})

		dispatch({
			type: PokemonActionTypes.REQUEST_POKEMON,
			query: query
		})
	}
}