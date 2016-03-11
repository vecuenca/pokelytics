import React from 'react';

import TextField from 'material-ui/lib/text-field';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';
import RaisedButton from 'material-ui/lib/raised-button';

class QueryBox extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = 'QueryBox';
	}

	render() {
		return (
			<div>
				<div className="text-field multi-line">
					<TextField
						style={style.textField}
						inputStyle={style.inputStyle}
						hintStyle={style.inputStyle}
						value={this.props.query}
						onChange={this.props.onChange.bind(this)}
						multiLine={true}
						rows={1}
						rowsMax={6}
						fullWidth={true}
						ref="search-bar"
						underlineShow={false} >
					</TextField>
				</div>
				<RaisedButton
					fullWidth={true}
					label="submit"
					primary={true}
					onClick={e => {
						let val = this.refs['search-bar'].getValue()
						this.props.onSubmit(val)
					}.bind(this)}></RaisedButton>
			</div>
			);
	}
}

const style = {
	textField: {
		color: '#7c4dff',
		width: '100%',
		paddingLeft: '10px',
		paddingRight: '10px',
		fontSize: '2 rem !important'
	},
	inputStyle: {
		paddingLeft: '10px',
		paddingRight: '10px',
	}
}

export default QueryBox;