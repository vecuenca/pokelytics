import React from 'react';
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'

import * as PokemonActions from '../actions/PokemonActions'
import CircularProgress from 'material-ui/lib/circular-progress';

class Pokemons extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = 'Pokemons';
	}

	componentDidMount() {
		this.props.dispatch(PokemonActions.getAll());
	}

	render() {
		if (this.props.pokemon.loaded) {
			return (
				<div>
					<h3>All Pokemons</h3>
					{this.props.pokemon.pokemon}
				</div>
				);	
		} else {
			return (
				<div className="LandingPage">
					<CircularProgress />
				</div>)
		}
		
	}
}

function mapStateToProps({ pokemon }) {
	return {
		pokemon: pokemon
	}
}

export default connect(mapStateToProps)(Pokemons);