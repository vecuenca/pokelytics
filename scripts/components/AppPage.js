import React from 'react';
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'

// UI Dependencies
import LeftNav from 'material-ui/lib/left-nav';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import AvPlaylistAdd from 'material-ui/lib/svg-icons/av/playlist-add'
import EditorFormatListNumbered from 'material-ui/lib/svg-icons/editor/format-list-numbered'
import SocialGroup from 'material-ui/lib/svg-icons/social/group'
import MapsPlace from 'material-ui/lib/svg-icons/maps/place'
import ActionInfo from 'material-ui/lib/svg-icons/action/info';

import QueryBox from './QueryBox'
import request from 'superagent';

class AppPage extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = 'AppPage';
		this.state = {
			query: '',
			res: [],
			err: ""
		}
	}

	allPokemonClick() {
		this.props.dispatch(pushPath('/pokemons'))
	}

	callApi(val) {
		request
			.post('/api/pokemon')
			.send({ query: val })
			.end((err, res) => {
				if (err || !res.ok) {
					this.setState(Object.assign({}, this.state, {
						err: err.response.text,
						res: []
					}))
				} else {
					this.setState(Object.assign({}, this.state, {
						err: "",
						res: res.text
					}))
				}
			})
	}

	onSubmit(val) {
		this.setState(Object.assign({}, this.state, {
			query: val
		}))
		this.callApi(val)
	}

	onChange(val) {
		this.setState(Object.assign({}, this.state, {
			query: val
		}))
	}

	render() {
		return (
			<div>
				<LeftNav>
					<List subheader="Table Schemas">
						<ListItem
							primaryText="Pokemons" 
							//secondaryText="Pokemon name, stats"
							rightIcon={<ActionInfo />}/>
						<ListItem
							primaryText="Trainers" 
							//secondaryText="Trainers' name, geo-location"
							rightIcon={<ActionInfo />}/>
						<ListItem
							primaryText="Moves" 
							//secondaryText="Moves' name, stats"
							rightIcon={<ActionInfo />}/>
						<ListItem
							primaryText="Locations" 
							//secondaryText="In-Game Locations"
							rightIcon={<ActionInfo />}/>
						<ListItem
							primaryText="Pokemon Moves" 
							//secondaryText="Moves that pokemon can learn"
							rightIcon={<ActionInfo />}/>
						<ListItem
							primaryText="Pokemon Locations" 
							//secondaryText="Locations where pokemon can be found"
							rightIcon={<ActionInfo />}/>
						<ListItem
							primaryText="Pokemon Trainers" 
							//secondaryText="Pokemon Trainer's team of pokemon'"
							rightIcon={<ActionInfo />}/>
					</List>
					<List subheader="Predefined SQL Queries">
						<ListItem
							onClick={this.allPokemonClick.bind(this)}
							primaryText="All Pokemon" 
							leftIcon={<EditorFormatListNumbered></EditorFormatListNumbered>}/>
						<ListItem
							primaryText="Trainers" 
							leftIcon={<SocialGroup></SocialGroup>}/>
						<ListItem
							primaryText="Pokemon Locations"       
							leftIcon={<MapsPlace></MapsPlace>}/>
					</List>
				</LeftNav>
				<div style={style.AppArea}>
					<h2 style={style.title}>Pokélytics</h2>
					<h5 style={style.tagLine} className="muted">Gotta analyze them all</h5>
					<div style={style.query}>
						<QueryBox
							onSubmit={this.onSubmit.bind(this)}
							onChange={this.onChange.bind(this)}></QueryBox>
					</div>
					<div style={style.results}>
						{this.state.err ? this.state.err : this.state.res }
					</div>
				</div>
			</div>
			);
	}
}

const style = {
	title: {
		fontSize: '56px',
		marginBottom: '0'
	},
	tagLine: {
		fontSize: '25px',
		marginTop: '0',
		marginBottom: '20px',
		textAlign: 'center'
	},
	AppArea: {
		display: 'block',
		marginLeft: '256px',
		padding: '15px 15px 15px 15px',
		height: '100%'
	},
	query: {
		display: 'block',
		maxWidth: '500px',
		width: '100%',
		margin: '0 auto',
		marginBottom: '30px'
	},
	results: {
		display: 'block',
		marginTop: '25px',
		maxWidth: '800px',
		width: '100%',
		overflow: 'scroll',
		margin: '0 auto'
	}
}

export default connect()(AppPage);