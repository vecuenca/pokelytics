import React from 'react';

import QueryBox from './QueryBox'
import ResultsTable from './ResultsTable'

class SqlArea extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = 'SqlArea';
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
		return (<div>
			<h2 style={this.getTitleStyle(style.title, this.props.query)}>Pokélytics</h2>
			<h5 style={this.getTitleStyle(style.tagLine, this.props.query)} className="muted">Gotta analyze them all</h5>
			<div style={this.getQueryBoxStyle(style.query, this.props.query)}>
				<QueryBox
					onSubmit={this.props.onSubmit}
					query={this.props.query}
					onChange={this.props.onChange}></QueryBox>
			</div>
			<div style={style.results}>
				{this.props.err ? this.props.err : undefined }
				{!this.props.err && this.props.res != "" ? this.renderResultsTable(this.props.res) : undefined}
			</div>
		</div>);
	}
}

const style = {
	results: {
		marginTop: '30px'
	},
	title: {
		fontSize: '56px',
		marginBottom: '0'
	},
	tagLine: {
		fontSize: '25px',
		marginTop: '0',
		marginBottom: '20px',
		textAlign: 'center'
	}
}

export default SqlArea;
