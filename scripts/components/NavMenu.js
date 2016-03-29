import React from 'react';

// UI dependencies
import LeftNav from 'material-ui/lib/left-nav';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import AutoComplete from 'material-ui/lib/auto-complete';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';

// icons
import AvPlaylistAdd from 'material-ui/lib/svg-icons/av/playlist-add'
import EditorFormatListNumbered from 'material-ui/lib/svg-icons/editor/format-list-numbered'
import SocialGroup from 'material-ui/lib/svg-icons/social/group'
import MapsPlace from 'material-ui/lib/svg-icons/maps/place'
import ActionInfo from 'material-ui/lib/svg-icons/action/info';
import ImageFlashOn from 'material-ui/lib/svg-icons/image/flash-on';

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
			pokemonList: []
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

	getPokemonMovesDialogActions() {
		return [
			<FlatButton
			      label="Cancel"
			      secondary={true}
			      onTouchTap={this.closePokemonMovesDialog}
			/>,
		      <FlatButton
				label="Submit"
				primary={true}
				keyboardFocused={true}
				onTouchTap={this.handlePokemonMovesDialogSubmit.bind(this)}
		      />,
		]
	}

	handlePokemonMovesDialogSubmit() {
		// run the query here
		let val = this.refs['pkmnMoveDiag'].getValue();
		var query = "SELECT m.*, pm.learned_at from pokemons p, pokemon_moves pm, moves m  WHERE pokemon = p.id and move = m.id and p.name='" + val + "'";
		this.props.displayAndSubmitQuery(query);
		
		this.closePokemonMovesDialog();
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
				actions={this.getPokemonMovesDialogActions()}
				open={this.state.openPokemonMovesDialog}
				onRequestClose={this.closePokemonMovesDialog}
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
			<List subheader="Table Schemas">
				<ListItem
					primaryText="Pokemon"
					onTouchTap={this.openTableSchemaDialog.bind(this, Schema.dialogData[0][1], Schema.dialogData[0][0])}
					rightIcon={<ActionInfo />}/>
				<ListItem
					primaryText="Trainers"
					onTouchTap={this.openTableSchemaDialog.bind(this, Schema.dialogData[1][1], Schema.dialogData[1][0])}
					rightIcon={<ActionInfo />}/>
				<ListItem
					primaryText="Moves"
					onTouchTap={this.openTableSchemaDialog.bind(this, Schema.dialogData[2][1], Schema.dialogData[2][0])}
					rightIcon={<ActionInfo />}/>
				<ListItem
					primaryText="Locations"
					onTouchTap={this.openTableSchemaDialog.bind(this, Schema.dialogData[3][1], Schema.dialogData[3][0])}
					rightIcon={<ActionInfo />}/>
				<ListItem
					primaryText="Pokemon Moves"
					onTouchTap={this.openTableSchemaDialog.bind(this, Schema.dialogData[4][1], Schema.dialogData[4][0])}
					rightIcon={<ActionInfo />}/>
				<ListItem
					primaryText="Pokemon Locations"
					onTouchTap={this.openTableSchemaDialog.bind(this, Schema.dialogData[5][1], Schema.dialogData[5][0])}
					rightIcon={<ActionInfo />}/>
				<ListItem
					primaryText="Pokemon Trainers"
					onTouchTap={this.openTableSchemaDialog.bind(this, Schema.dialogData[6][1], Schema.dialogData[6][0])}
					rightIcon={<ActionInfo />}/>
			</List>
			<List subheader="Predefined SQL Queries">
				<ListItem
					onClick={this.props.displayAndSubmitQuery.bind(this, 'SELECT * from pokemons')}
					primaryText="All Pokemon"
					leftIcon={<EditorFormatListNumbered></EditorFormatListNumbered>}/>
				<ListItem
					primaryText="Trainers"
					onClick={this.props.displayAndSubmitQuery.bind(this, 'SELECT * from trainers')}
					leftIcon={<SocialGroup></SocialGroup>}/>
				<ListItem
					primaryText="Pokemon Locations"
					onClick={this.props.displayAndSubmitQuery.bind(this, 'SELECT * from locations')}
					leftIcon={<MapsPlace></MapsPlace>}/>
				<ListItem
					primaryText="Find a Pokemon's moves"
					onClick={this.openPokemonMovesDialog.bind(this)}
					leftIcon={<ImageFlashOn></ImageFlashOn>}/>
			</List>
		</LeftNav>);
	}
}


const dialogStyle = {
	whiteSpace: 'pre-wrap'
};

export default NavMenu;