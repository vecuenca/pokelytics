import React from 'react';
import { pushPath } from 'redux-simple-router'

// UI Dependencies
import NavigationChevronLeft from 'material-ui/lib/svg-icons/navigation/chevron-left';
import NavigationChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right';
import IconButton from 'material-ui/lib/icon-button';

import NavMenu from './NavMenu'
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
			leftNavOpen: true
		}
	}

	callApi(val) {
		return new Promise((resolve, reject) => {
			request
				.post('/api/pokemon')
				.send({ query: val })
				.end((err, res) => {
					if (err || !res.ok) {
						reject(err.response.text);
					} else {
						resolve(res.text);
					}
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

	// Saves query, calls api and saves result back to app state.
	onSubmit(val) {
		this.setState({
			query: val
		})
		this.callApi(val)
			.then( res => {
				this.setState({
					err: "",
					res: res
				})
			})
			.catch( err => {
				this.setState({
					err: err
				})
			})
	}

	onChange(val) {
		this.setState({
			query: val
		})
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
		return (
			<div>
				<NavMenu
					displayAndSubmitQuery={this.onSubmit.bind(this)}
					query={this.callApi}
					open={this.state.leftNavOpen}>
				</NavMenu>
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

export default AppPage;