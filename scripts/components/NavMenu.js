import React from 'react';

// UI dependencies
import LeftNav from 'material-ui/lib/left-nav';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import AutoComplete from 'material-ui/lib/auto-complete';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import Divider from 'material-ui/lib/divider';

// icons
import AvPlaylistAdd from 'material-ui/lib/svg-icons/av/playlist-add'
import AvAlbum from 'material-ui/lib/svg-icons/av/album'
import EditorFormatListNumbered from 'material-ui/lib/svg-icons/editor/format-list-numbered'
import SocialGroup from 'material-ui/lib/svg-icons/social/group'
import MapsPlace from 'material-ui/lib/svg-icons/maps/place'
import ActionInfo from 'material-ui/lib/svg-icons/action/info';
import ActionHome from 'material-ui/lib/svg-icons/action/home';
import ImageFlashOn from 'material-ui/lib/svg-icons/image/flash-on';
import Group from 'material-ui/lib/svg-icons/social/group';
import WhatsHot from 'material-ui/lib/svg-icons/social/whatshot';
import GroupWork from 'material-ui/lib/svg-icons/action/group-work';

import * as Schema from '../constants/Schema'

class NavMenu extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = 'NavMenu';
		this.state = {
			// Table Schema Dialog
			openTableSchemaDialog: false,
			tableSchemaDialogContent: "",
			tableSchemaDialogTitle: "",
			// Pokemon Moves Dialog
			openPokemonMovesDialog: false,
			moveDiagOpen: false,
			pokemonList: [],
			// Pokemon Trainers Dialog
			openPokemonTrainersDialog: false,
			trainerDiagOpen: false,
			trainerList: [],
			// Pokemon Available at location X
			openPokemonAvailableDialog: false,
			pokemonAvailableDiagOpen: false,
			locationList: [],
			// Where can i find this pokemon
			openPokemonLocationDialog: false,
			pokemonLocationDiagOpen: false
		}
	}

	openTableSchemaDialog(dialogContent, dialogTitle) {
		this.setState({
			openTableSchemaDialog: true,
			tableSchemaDialogContent: dialogContent,
			tableSchemaDialogTitle: dialogTitle
		})
	}

	closeTableSchemaDialog() {
		this.setState({
			openTableSchemaDialog: false
		})
	}

	// Populate autocomplete's data source
	openPokemonMovesDialog() {
		// Get pokemon names and store it in state
		this.props.query("SELECT name from pokemons").then( res => {
			var json = JSON.parse(res);
			json.shift();
			var result = [];

			for (var i in json)
				result.push(json[i].name);

			this.setState({
				pokemonList: result
			})
		});

		this.setState({
			openPokemonMovesDialog: true,
		})
	}

	closePokemonMovesDialog() {
		this.setState({
			openPokemonMovesDialog: false
		})
	}

	// Populate autocomplete's data source
	openPokemonTrainersDialog() {
		// Get pokemon names and store it in state
		this.props.query("SELECT name from trainers").then( res => {
			var json = JSON.parse(res);
			json.shift();
			var result = [];

			for (var i in json)
				result.push(json[i].name);

			this.setState({
				trainerList: result
			})
		});

		this.setState({
			openPokemonTrainersDialog: true,
		})
	}

	closePokemonTrainersDialog() {
		this.setState({
			openPokemonTrainersDialog: false
		})
	}

	getDialogActions(closePokemonMovesDialog, handlePokemonMovesDialogSubmit) {
		return [
			<FlatButton
			      label="Cancel"
			      secondary={true}
			      onTouchTap={closePokemonMovesDialog}
			/>,
		      <FlatButton
				label="Submit"
				primary={true}
				keyboardFocused={true}
				onTouchTap={handlePokemonMovesDialogSubmit}
		      />,
		]
	}

	getPokemonTrainersDialogActions() {
		return [
			<FlatButton
			      label="Cancel"
			      secondary={true}
			      onTouchTap={this.closePokemonTrainersDialog.bind(this)}
			/>,
		      <FlatButton
				label="Submit"
				primary={true}
				keyboardFocused={true}
				onTouchTap={this.handlePokemonTrainersDialogSubmit.bind(this)}
		      />,
		]
	}

	handlePokemonMovesDialogSubmit() {
		// run the query here
		let val = this.refs['pkmnMoveDiag'].getValue();
		var query = 
		"SELECT m.*, pm.learned_at \r\n\
FROM pokemons p, pokemon_moves pm, moves m \r\n\
WHERE pokemon = p.id and move = m.id and p.name='" + val + "'";
		this.props.displayAndSubmitQuery(query);

		this.closePokemonMovesDialog();
	};

	handlePokemonTrainersDialogSubmit() {
		// run the query here
		let val = this.refs['pkmnTrainerDiag'].getValue();
		var id;

		var res  = this.props.query("SELECT t.id from trainers t where t.name='" + val + "'").then( res => {
			var json = JSON.parse(res);
			json.shift();
			id = json[0].id;
			var query = "select pt.name, m1.name AS move1, m2.name AS move2, m3.name AS move3, m4.name AS move4 \r\n\
FROM homestead.pokemon_trainers pt \r\n\
JOIN homestead.moves m1 ON pt.move1 = m1.id AND pt.trainer ='" + id +"'\r\n\
JOIN homestead.moves m2 ON pt.move2 = m2.id AND pt.trainer ='" + id +"'\r\n\
JOIN homestead.moves m3 ON pt.move3 = m3.id AND pt.trainer ='" + id +"'\r\n\
JOIN homestead.moves m4 ON pt.move4 = m4.id AND pt.trainer ='" + id +"'";

			this.props.displayAndSubmitQuery(query);
			this.closePokemonTrainersDialog();
		});
	}

	openPokemonAvailableDialog() {
		// Get pokemon names and store it in state
		this.props.query("SELECT name from locations").then( res => {
			var json = JSON.parse(res);
			json.shift();
			var result = [];

			for (var i in json)
				result.push(json[i].name);

			this.setState({
				locationList: result
			})
		});

		this.setState({
			openPokemonAvailableDialog: true,
		})
	}

	closePokemonAvailableDialog() {
		this.setState({
			openPokemonAvailableDialog: false
		})
	}

	handlePokemonAvailableDialogSubmit() {
		// run the query here
		let val = this.refs['pokemonAvailableDiag'].getValue();
		var query =	
		"select p.id as 'id', p.name as 'Pokemon', p.catch_rate as 'Catch Rate' \r\n\
from \r\n\
pokemon_locations pl \r\n\
join locations l on pl.location = l.id \r\n\
join pokemons p on p.id = pl.pokemon \r\n\
where l.name = '" + val + "'"
		this.props.displayAndSubmitQuery(query);
		
		this.closePokemonAvailableDialog();
	};

	openPokemonLocationDialog() {
		// Get pokemon names and store it in state
		this.props.query("SELECT name from pokemons").then( res => {
			var json = JSON.parse(res);
			json.shift();
			var result = [];

			for (var i in json)
				result.push(json[i].name);

			this.setState({
				pokemonList: result
			})
		});

		this.setState({
			openPokemonLocationDialog: true,
		})
	}

	closePokemonLocationDialog() {
		this.setState({
			openPokemonLocationDialog: false
		})
	}

	handlePokemonLocationDialogSubmit() {
		// run the query here
		let val = this.refs['pokemonLocationDiag'].getValue();
		var query = 	"select l.name as 'Location' \r\n\
FROM \r\n\
pokemon_locations pl \r\n\
JOIN locations l on pl.location = l.id \r\n\
JOIN pokemons p on p.id = pl.pokemon \r\n\
WHERE p.name = '" + val + "'";
		this.props.displayAndSubmitQuery(query);
		
		this.setState({
			openPokemonLocationDialog: false
		})
	};

	render() {
		return (<LeftNav open={this.props.open}>
			<Dialog
				title={this.state.tableSchemaDialogTitle}
				modal={false}
				open={this.state.openTableSchemaDialog}
				onRequestClose={this.closeTableSchemaDialog.bind(this)}
				style={dialogStyle}>
				{this.state.tableSchemaDialogContent}
			</Dialog>
			<Dialog
				title='Choose a Pokemon to view their moves'
				modal={false}
				actions={this.getDialogActions(this.closePokemonMovesDialog.bind(this), this.handlePokemonMovesDialogSubmit.bind(this))}
				open={this.state.openPokemonMovesDialog}
				onRequestClose={this.closePokemonMovesDialog.bind(this)}
				style={dialogStyle}>
				<div>
					<AutoComplete
						ref='pkmnMoveDiag'
						hintText="Enter Pokemon name"
						filter={AutoComplete.fuzzyFilter}
						dataSource={this.state.pokemonList}
						triggerUpdateOnFocus={true} />
				</div>
			</Dialog>
			<Dialog
				title='Choose a Trainer to view their Pokemon'
				modal={false}
				actions={this.getPokemonTrainersDialogActions()}
				open={this.state.openPokemonTrainersDialog}
				onRequestClose={this.closePokemonTrainersDialog.bind(this)}
				style={dialogStyle}>
				<div>
					<AutoComplete
						ref='pkmnTrainerDiag'
						hintText="Enter Trainer name"
						filter={AutoComplete.fuzzyFilter}
						dataSource={this.state.trainerList}
						triggerUpdateOnFocus={true} />
				</div>
			</Dialog>

			<Dialog
				title='What can I catch at this location?'
				modal={false}
				actions={this.getDialogActions(this.closePokemonAvailableDialog.bind(this), this.handlePokemonAvailableDialogSubmit.bind(this))}
				open={this.state.openPokemonAvailableDialog}
				onRequestClose={this.closePokemonAvailableDialog.bind(this)}
				style={dialogStyle}>
				<div>
					<AutoComplete
						ref='pokemonAvailableDiag'
						hintText="Enter Location"
						filter={AutoComplete.fuzzyFilter}
						dataSource={this.state.locationList}
						triggerUpdateOnFocus={true} />
				</div>
			</Dialog>
			<Dialog
				title='Where can I catch this pokemon?'
				modal={false}
				actions={this.getDialogActions(this.closePokemonLocationDialog.bind(this), this.handlePokemonLocationDialogSubmit.bind(this))}
				open={this.state.openPokemonLocationDialog}
				onRequestClose={this.closePokemonLocationDialog.bind(this)}
				style={dialogStyle}>
				<div>
					<AutoComplete
						ref='pokemonLocationDiag'
						hintText="Enter Pokemon"
						filter={AutoComplete.fuzzyFilter}
						dataSource={this.state.pokemonList}
						triggerUpdateOnFocus={true} />
				</div>
			</Dialog>
			<List>
				<ListItem
					onClick={() => { window.location = '/' }}
					leftIcon={<ActionHome></ActionHome>}
					primaryText="Home">
				</ListItem>
			</List>
			<Divider></Divider>
			<ListItem
				primaryText="Table Schemas"
        leftIcon={<ActionInfo />}
        initiallyOpen={false}
        primaryTogglesNestedList={true}
        nestedItems={[
					<ListItem
						primaryText="Pokemon"
						onTouchTap={this.openTableSchemaDialog.bind(this, Schema.dialogData[0][1], Schema.dialogData[0][0])}
						/>,
					<ListItem
						primaryText="Trainers"
						onTouchTap={this.openTableSchemaDialog.bind(this, Schema.dialogData[1][1], Schema.dialogData[1][0])}
						/>,
					<ListItem
						primaryText="Moves"
						onTouchTap={this.openTableSchemaDialog.bind(this, Schema.dialogData[2][1], Schema.dialogData[2][0])}
						/>,
					<ListItem
						primaryText="Locations"
						onTouchTap={this.openTableSchemaDialog.bind(this, Schema.dialogData[3][1], Schema.dialogData[3][0])}
						/>,
					<ListItem
						primaryText="Pokemon Moves"
						onTouchTap={this.openTableSchemaDialog.bind(this, Schema.dialogData[4][1], Schema.dialogData[4][0])}
						/>,
					<ListItem
						primaryText="Pokemon Locations"
						onTouchTap={this.openTableSchemaDialog.bind(this, Schema.dialogData[5][1], Schema.dialogData[5][0])}
						/>,
					<ListItem
						primaryText="Pokemon Trainers"
						onTouchTap={this.openTableSchemaDialog.bind(this, Schema.dialogData[6][1], Schema.dialogData[6][0])}
						/>,]}
			/>
			<Divider></Divider>
			<List subheader="Predefined SQL Queries">
				<ListItem
					onClick={this.props.displayAndSubmitQuery.bind(this, 'SELECT * from pokemons')}
					primaryText="All Pokemon"
					leftIcon={<EditorFormatListNumbered></EditorFormatListNumbered>}/>
				<ListItem
					primaryText="Where can I catch this pokemon?"
					onClick={this.openPokemonLocationDialog.bind(this)}
					leftIcon={<AvAlbum></AvAlbum>}/>
				<ListItem
					primaryText="What can I catch here?"
					onClick={this.openPokemonAvailableDialog.bind(this)}
					leftIcon={<MapsPlace></MapsPlace>}/>
				<ListItem
					primaryText="Find a Pokemon's moves"
					onClick={this.openPokemonMovesDialog.bind(this)}
					leftIcon={<ImageFlashOn></ImageFlashOn>}/>
				<ListItem
					primaryText="Find a Trainer's Pokemon"
					onClick={this.openPokemonTrainersDialog.bind(this)}
					leftIcon={<Group></Group>}/>
			</List>
			<Divider></Divider>
			<List subheader="Analytics">
				<ListItem
					primaryText="Pokemon grouped by type"
					onClick={() => { window.location='/graphs' }}
					leftIcon={<GroupWork></GroupWork>}/>
				<ListItem
					primaryText="Most popular Pokemon"
					onClick={() => { window.location='/Popularity' }}
					leftIcon={<WhatsHot></WhatsHot>}/>
			</List>
		</LeftNav>);
	}
}


const dialogStyle = {
	whiteSpace: 'pre-wrap'
};

export default NavMenu;