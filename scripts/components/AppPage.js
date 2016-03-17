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
import Dialog from 'material-ui/lib/dialog';

import QueryBox from './QueryBox'
import request from 'superagent';

class AppPage extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = 'AppPage';
		this.state = {
			query: '',
			res: [],
			err: "",
			open: false,
			dialog: "",
			dialogTitle: ""
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

	handleOpen = (dialog, dialogTitle) => {
    this.setState({open: true, dialog: dialog, dialogTitle: dialogTitle});
  };

  handleClose = () => {
    this.setState({open: false});
  };

	render() {
		const dialogData = [
		["Pokemon Schema",
		"Columns:id	int(10) UN AI PK \r\n \
		name	varchar(255) \r\n \
		type_1	varchar(255) \r\n \
		type_2	varchar(255) \r\n \
		hp	double(4,1) \r\n \
		attack	double(4,1) \r\n \
		defense	double(4,1) \r\n \
		special	double(4,1) \r\n \
		speed	double(4,1) \r\n \
		catch_rate	double(4,1)"],
		["Trainer Schema",
		"Columns: \r\n \
		id	int(10) UN AI PK \r\n \
		name	varchar(255) \r\n \
		physical_location	varchar(255)"],
		["Moves Schema",
		"Columns: \r\n \
		id	int(10) UN AI PK \r\n \
		name	varchar(255) \r\n \
		type	varchar(255) \r\n \
		category	varchar(255) \r\n \
		power	int(11) \r\n \
		accuracy	int(11) \r\n \
		pp	int(11) \r\n \
		effect	varchar(255)"],
		["Locations Schema",
		"Columns: \
		id	int(10) UN AI PK \
		name	varchar(255) \
		region	varchar(255) \
		music_played	varchar(255)"],
		["Pokemon Moves Schema",
		"Columns: \r\n \
		pokemon	int(10) UN PK \r\n \
		move	int(10) UN PK \r\n \
		learned_at	int(11) PK"],
		["Pokemon Locations Schema",
		"Columns: \r\n \
		pokemon	int(10) UN \r\n \
		location	int(10) UN"],
		["Pokemon Trainers Schema",
		"Columns: \r\n \
		pokemon	int(10) UN PK \r\n \
		trainer	int(10) UN PK \r\n \
		name	varchar(255) PK \r\n \
		move1	int(10) UN \r\n \
		move2	int(10) UN \r\n \
		move3	int(10) UN \r\n \
		move4	int(10) UN"]
		]

		var dialogStyle = {
			whiteSpace: 'pre-wrap'
		};

		return (
			<div>
				<LeftNav>
					<List subheader="Table Schemas">
						<Dialog
		          title={this.state.dialogTitle}
		          modal={false}
		          open={this.state.open}
		          onRequestClose={this.handleClose}
		          style={dialogStyle}
		        >
		        {this.state.dialog}
        		</Dialog>

						<ListItem
							primaryText="Pokemons"
							onTouchTap={this.handleOpen.bind(this, dialogData[0][1], dialogData[0][0])}
							//secondaryText="Pokemon name, stats"
							rightIcon={<ActionInfo />}/>
						<ListItem
							primaryText="Trainers"
							onTouchTap={this.handleOpen.bind(this, dialogData[1][1], dialogData[1][0])}
							//secondaryText="Trainers' name, geo-location"
							rightIcon={<ActionInfo />}/>
						<ListItem
							primaryText="Moves"
							onTouchTap={this.handleOpen.bind(this, dialogData[2][1], dialogData[2][0])}
							//secondaryText="Moves' name, stats"
							rightIcon={<ActionInfo />}/>
						<ListItem
							primaryText="Locations"
							onTouchTap={this.handleOpen.bind(this, dialogData[3][1], dialogData[3][0])}
							//secondaryText="In-Game Locations"
							rightIcon={<ActionInfo />}/>
						<ListItem
							primaryText="Pokemon Moves"
							onTouchTap={this.handleOpen.bind(this, dialogData[4][1], dialogData[4][0])}
							//secondaryText="Moves that pokemon can learn"
							rightIcon={<ActionInfo />}/>
						<ListItem
							primaryText="Pokemon Locations"
							onTouchTap={this.handleOpen.bind(this, dialogData[5][1], dialogData[5][0])}
							//secondaryText="Locations where pokemon can be found"
							rightIcon={<ActionInfo />}/>
						<ListItem
							primaryText="Pokemon Trainers"
							onTouchTap={this.handleOpen.bind(this, dialogData[6][1], dialogData[6][0])}
							//secondaryText="Pokemon Trainer's team of pokemon'"
							rightIcon={<ActionInfo />}/>
					</List>
					<List subheader="Predefined SQL Queries">
						<ListItem
							onClick={this.onSubmit.bind('SELECT * from Pokemons')}
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