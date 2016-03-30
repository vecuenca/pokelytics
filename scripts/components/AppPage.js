import React from 'react';
import { pushPath } from 'redux-simple-router'

// UI Dependencies
import NavigationChevronLeft from 'material-ui/lib/svg-icons/navigation/chevron-left';
import NavigationChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right';
import IconButton from 'material-ui/lib/icon-button';

import NavMenu from './NavMenu'
import SqlArea from './SqlArea'

import request from 'superagent';


class AppPage extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = 'AppPage';
		this.state = {
			query: '',
			res: "",
			err: "",
			leftNavOpen: true,
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
		return Object.assign({}, style.AppArea, {
			marginLeft: leftNavIsOpen ? '256px' : '0'
		})
	}

	renderQueryArea() {
		return (<SqlArea
					query={this.state.query}
					onSubmit={this.onSubmit.bind(this)}
					onChange={this.onChange.bind(this)}
					res={this.state.res}
					err={this.state.err}
					></SqlArea>)
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
						{window.location.pathname === '/' ? this.renderQueryArea() : undefined }
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
		padding: '15px 15px 15px 15px',
		height: '100%',
		position: 'relative'
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
		top: '0',
		left: '0'
	}
}

export default AppPage;