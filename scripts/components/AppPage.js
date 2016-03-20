import React from 'react';
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'

// UI Dependencies
import LeftNav from 'material-ui/lib/left-nav';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import AutoComplete from 'material-ui/lib/auto-complete';

// icons
import AvPlaylistAdd from 'material-ui/lib/svg-icons/av/playlist-add'
import EditorFormatListNumbered from 'material-ui/lib/svg-icons/editor/format-list-numbered'
import SocialGroup from 'material-ui/lib/svg-icons/social/group'
import MapsPlace from 'material-ui/lib/svg-icons/maps/place'
import ActionInfo from 'material-ui/lib/svg-icons/action/info';
import NavigationChevronLeft from 'material-ui/lib/svg-icons/navigation/chevron-left';
import NavigationChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right';
import ImageFlashOn from 'material-ui/lib/svg-icons/image/flash-on';


import Dialog from 'material-ui/lib/dialog';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';

import QueryBox from './QueryBox'
import ResultsTable from './ResultsTable'
import request from 'superagent';

class AppPage extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = 'AppPage';
		this.state = {
			query: '',
			res: "",
			err: "",
			open: false,
			moveDiagOpen: false,
			dialog: "",
			dialogTitle: "",
			leftNavOpen: true,
			pkmnMoveDiagRes: []
		}
	}

	// Delete this
	allPokemonClick() {
		this.props.dispatch(pushPath('/pokemons'))
	}

	callApi(val) {
		request
			.post('/api/pokemon')
			.send({ query: val })
			.end((err, res) => {
				if (err || !res.ok) {
					this.setState({
						err: err.response.text,
						res: []
					})
				} else {
					this.setState({
						err: "",
						res: res.text
					})
				}
			})
	}

	getPokemonNames() {
		request
			request
			.post('/api/pokemon')
			.send({ query: "SELECT name from pokemons" })
			.end((err, res) => {
				var json = JSON.parse(res.text);
				json.shift();
				var result = [];

				for (var i in json)
					result.push(json[i].name);
				this.setState({
					pkmnMoveDiagRes: result
				})
			})
	}

	openLeftNav() {
		this.setState({
			leftNavOpen: true
		})
	}

	closeLeftNav() {
		this.setState({
			leftNavOpen: false
		})
	}

	onSubmit(val) {
		this.setState({
			query: val
		})
		this.callApi(val)
	}

	onChange(val) {
		this.setState({
			query: val
		})
	}

	handleOpen = (dialog, dialogTitle) => {
		this.setState({open: true, dialog: dialog, dialogTitle: dialogTitle});
	};

	handleMoveDiagOpen = () => {
		this.getPokemonNames();
		this.setState({moveDiagOpen: true});
	};

	handleClose = () => {
		this.setState({open: false});
	};

	handleMoveDiagClose = () => {
		this.setState({moveDiagOpen: false});
	};

	handleMoveDiagSubmit = () => {
		// run the query here
		let val = this.refs['pkmnMoveDiag'].getValue();
		var query = "SELECT m.* from pokemons p, pokemon_moves, moves m  WHERE pokemon = p.id and move = m.id and p.name='" + val + "'";
		this.setState({
			query: query
		})
		this.setState({moveDiagOpen: false});
		this.callApi(query);
	};

	onClickPredefinedQuery(query) {
		this.onChange(query)
		this.onSubmit(query)
	}

	getStyle(leftNavIsOpen) {
		return Object.assign({}, style, {
			marginLeft: leftNavIsOpen ? '256px' : '0'
		})
	}

	getTitleStyle(defaultStyle, query) {
		if (query !== "") {
			return Object.assign({}, defaultStyle, {
				display: 'none'
			})
		} else {
			return Object.assign({}, defaultStyle, {
				display: 'block'
			})
		}
	}

	getQueryBoxStyle(defaultStyle, query) {
		if (query !== "") {
			return Object.assign({}, defaultStyle, {
				marginTop: '20px'
			})
		} else {
			return Object.assign({}, defaultStyle, {
				marginTop: '0'
			})
		}
	}

	renderResultsTable(dataSetString) {
		try {
			let dataSet = JSON.parse(dataSetString)
			return <ResultsTable dataset={dataSetString} />
		} catch (err) { // if error it must be from json.parse
			return <div style={{marginLeft: '20px', marginRight: '20px'}}>{dataSetString}</div>
		}
	}

	render() {

		// Move this and related dialog to own component?
		const pkmnMoveDiagActions = [
			<FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleMoveDiagClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleMoveDiagSubmit}
      />,
		];
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
				<LeftNav open={this.state.leftNavOpen}>
					<List subheader="Table Schemas">
						<Dialog
							title={this.state.dialogTitle}
							modal={false}
							open={this.state.open}
							onRequestClose={this.handleClose}
							style={dialogStyle}>
							{this.state.dialog}
						</Dialog>
						<Dialog
							title='Choose a Pokemon to view their moves'
							modal={false}
							actions={pkmnMoveDiagActions}
							open={this.state.moveDiagOpen}
							onRequestClose={this.handleMoveDiagClose}
							style={dialogStyle}>
							<div>
								<AutoComplete
									ref='pkmnMoveDiag'
									hintText="Enter Pokemon name"
									filter={AutoComplete.fuzzyFilter}
									dataSource={this.state.pkmnMoveDiagRes}
									triggerUpdateOnFocus={true}/>
							</div>
						</Dialog>

						<ListItem
							primaryText="Pokemon"
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
							onClick={this.onClickPredefinedQuery.bind(this, 'SELECT * from pokemons')}
							primaryText="All Pokemon"
							leftIcon={<EditorFormatListNumbered></EditorFormatListNumbered>}/>
						<ListItem
							primaryText="Trainers"
							onClick={this.onClickPredefinedQuery.bind(this, 'SELECT * from trainers')}
							leftIcon={<SocialGroup></SocialGroup>}/>
						<ListItem
							primaryText="Pokemon Locations"
							onClick={this.onClickPredefinedQuery.bind(this, 'SELECT * from locations')}
							leftIcon={<MapsPlace></MapsPlace>}/>
						<ListItem
							primaryText="Find a Pokemon's moves"
							onClick={this.handleMoveDiagOpen}
							leftIcon={<ImageFlashOn></ImageFlashOn>}/>
					</List>
				</LeftNav>
				<div style={this.getStyle(this.state.leftNavOpen)}>
					{this.state.leftNavOpen ?
						<IconButton style={style.iconButton} onClick={this.closeLeftNav.bind(this)}><NavigationChevronLeft></NavigationChevronLeft></IconButton> : 
						<IconButton style={style.iconButton} onClick={this.openLeftNav.bind(this)}><NavigationChevronRight></NavigationChevronRight></IconButton>}
					<h2 style={this.getTitleStyle(style.title, this.state.query)}>Pokélytics</h2>
					<h5 style={this.getTitleStyle(style.tagLine, this.state.query)} className="muted">Gotta analyze them all</h5>
					<div style={this.getQueryBoxStyle(style.query, this.state.query)}>
						<QueryBox
							onSubmit={this.onSubmit.bind(this)}
							query={this.state.query}
							onChange={this.onChange.bind(this)}></QueryBox>
					</div>
					<div style={style.results}>
						{this.state.err ? this.state.err : undefined }
						{!this.state.err && this.state.res != "" ? this.renderResultsTable(this.state.res) : undefined}
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
	iconButton: {
		position: 'absolute',
		top: '0'
	},
	results: {
		display: 'block',
		marginTop: '25px',
		marginLeft: '20px',
		marginRight: '20px',
		width: '100%',
		margin: '0 auto',
		marginBottom: '20px'
	}
}

export default connect()(AppPage);