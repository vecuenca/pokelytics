import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = 'Home';
	}

	render() {
		return (
			<div className="HomePage">
				<h2 style={style.title}>Pokélytics</h2>
				<h5 style={style.tagLine} className="muted">Gotta analyze them all</h5>
				<RaisedButton label="Get Started" onClick={console.log("clicked")}></RaisedButton>
			</div>);
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
		marginBottom: '30px',

	}
}

export default Home;