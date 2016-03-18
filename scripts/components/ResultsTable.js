import React from 'react';

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

class ResultsTable extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = 'ResultsTable';
	}

	render() {
		return (
			<div style={{marginLeft: '20px', marginRight: '20px'}}>
				<Table>
					<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
						<TableRow>
							{this.props.headers.map(el => {
								return <TableHeaderColumn key={el}>{el}</TableHeaderColumn>
							})}
						</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={false}>
						{this.props.dataset.map((el, i) => {
							let values = _.values(el)
							return (
								<TableRow key={i}>
								{values.map((el, j) => {
									return (
										<TableRowColumn key={i+"."+j}>
											{el}
										</TableRowColumn>)
								})}
								</TableRow>)
						})}
					</TableBody>	
				</Table>
			</div>)
	}
}

export default ResultsTable;
