import React from 'react';
import request from 'superagent';
var Chart = require('react-d3-core').Chart;
var BarChart = require('react-d3-basic').BarChart;

import FloatingActionButton from 'material-ui/lib/floating-action-button';
import NavigationChevronLeft from 'material-ui/lib/svg-icons/navigation/chevron-left';

class Popularity extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = 'Popularity';
	}

	getPokemonCount() {

		let cb = (err, res) => {
			var arr = []
			var json = JSON.parse(res.text);
			json.shift();
			var result = 0;
			var name = "";
			var array = []
			for (var i in json)
			{
				result = json[i].count;
				name = json[i].name;
				array = [name,result]
				arr.push(array)
			}
			this.setState({
			arr
			})
		}
		request
			.post('/api/pokemon')
			.send({ query: `select p.name,count(*) as count from 
				pokemon_trainers pt join pokemons p  on 
				pt.pokemon = p.id group by pokemon having count(pokemon) >=1
				order by count desc` })
			.end(cb.bind(this))
	}
	
	componentDidMount()
	{
		
			this.getPokemonCount()
		
	}
	render() {
		var width = 1500,
		height = 800,
		margins = {left: 100, right: 100, top: 50, bottom: 50},
		title = "User sample",
		// chart series,
		// field: is what field your data want to be selected
		// name: the name of the field that display in legend
		// color: what color is the line
		chartSeries = [
			{
				field: 'COUNT',
				name: 'Number of Pokemons',
				color: '#ff7f0e'
			}],
		// your x accessor
		x = function(d) {
			return d.index;
		}
 
 		if (this.state == null)
  		{
  			return (<p>LOADING</p>);
  		}
  		var chartData = [];

  		for (var index in this.state.arr)
  		{
  			var tuple = {
  				COUNT: this.state.arr[index][1], 
  				index: this.state.arr[index][0]
  			}
  			chartData.push(tuple)
  		}
    		
	  
		var xScale = "ordinal";
		var xLabel = 'POKEMON';
		var yLabel = "Frequency";
		var yTicks = [1,""];
		
		return (
			<div>
				<FloatingActionButton 
					style={{ 
						marginTop: '10px', 
						marginLeft: '10px',
						position: 'fixed',
						top: 0,
						left: 0
					}} 
					onClick={() => {window.location = '/'} }>
					<NavigationChevronLeft></NavigationChevronLeft>
				</FloatingActionButton>
				<h3 style={{textAlign: 'center'}}>Most popular pokemons</h3>
				<BarChart
					title={title}
					width={width}
					height={height}
					data={chartData}
					chartSeries={chartSeries}
					x={x}
					xLabel={xLabel}
					xScale = {xScale}
					yTicks = {yTicks}
					yLabel = {yLabel} />
			</div>
		)
	}
}

export default Popularity;