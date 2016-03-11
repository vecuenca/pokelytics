import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'

class LandingPage extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = 'LandingPage';
	}

	onGetStartedClick() {
		this.props.dispatch(pushPath('/'))
	}

	render() {
		return (
			<div className="LandingPage">
				<h2 style={style.title}>Pokélytics</h2>
				<h5 style={style.tagLine} className="muted">Gotta analyze them all</h5>
				<RaisedButton label="Get Started" onClick={this.onGetStartedClick.bind(this)}></RaisedButton>
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
		marginBottom: '20px',
	}
}

export default connect()(LandingPage);