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

class AppPage extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = 'AppPage';
	}

	allPokemonClick() {
		this.props.dispatch(pushPath('/pokemons'))
	}

	render() {
		return (
			<div>
				<LeftNav>
					<List subheader="Pokemon Team Management">
						<ListItem
							primaryText="Your Pokemon" 
							leftIcon={<AvPlaylistAdd></AvPlaylistAdd>}/>
					</List>
					<List subheader="Pokemon Information">
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
					{this.props.children}
				</div>
			</div>
			);
	}
}

const style = {
	AppArea: {
		display: 'block',
		marginLeft: '256px',
		padding: '15px 15px 15px 15px'
	}
}

export default connect()(AppPage);