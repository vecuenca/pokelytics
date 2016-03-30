import React from 'react';
import request from 'superagent';

var Chart = require('react-d3-core').Chart;
var BarChart = require('react-d3-basic').BarChart;

class Graph extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = 'Graph';
	}

	getPokemonCount(type) {
		let cb = (err, res) => {
			var json = JSON.parse(res.text);
			json.shift();
			var result = 0;

			for (var i in json)
				result += json[i].type;

			this.setState({
				[type]: result
			})
		}
		request
			.post('/api/pokemon')
			.send({ query: `SELECT COUNT(type_1) AS type from pokemons where type_1 = 
				"${type}" UNION SELECT COUNT(type_2) from pokemons where type_2 = "${type}"` })
			.end(cb.bind(this))
	}
	
	componentDidMount()
	{
		var types = ["Grass","Fire","Water","Bug","Normal","Poison","Electric",
			"Ground","Fighting","Psychic","Rock","Ghost","Ice","Dragon"]
		for (var i in types)
		{
			this.getPokemonCount(types[i]);
		}
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
				name: 'OCCURENCE',
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

    		var chartData = [
		{
		COUNT: this.state.Grass,
		index: "Grass"
		},
		{

		COUNT: this.state.Fire,
		index: "Fire"
		},
		{
		COUNT: this.state.Water,
		index: "Water"
		},
		{
		COUNT: this.state.Bug,
		index: "Bug"
		},
		{
		COUNT: this.state.Normal,
		index: "Normal"
		},
		{
		COUNT: this.state.Poison,
		index: "Poison"
		},
		{
		COUNT: this.state.Electric,
		index: "Electric"
		},
		{
		COUNT: this.state.Ground,
		index: "Ground"
		},
		{
		COUNT: this.state.Fighting,
		index: "Fighting"
		},	  
		{
		COUNT: this.state.Psychic,
		index: "Psychic"
		},
		{
		COUNT: this.state.Rock,
		index: "Rock"
		},
		{
		COUNT: this.state.Ghost,
		index: "Ghost"
		},
		{
		COUNT: this.state.Ice,
		index: "Ice"
		},
		{
		COUNT: this.state.Dragon,
		index: "Dragon"
		}]
	  
		var xScale = "ordinal";
		var xLabel = 'Pokemon Type';
		var yLabel = "Frequency";
		var yTicks = [10,""];

		return (
			<div>
				<h3 style={{textAlign: 'center'}}>Number of Pokemon grouped by type</h3>
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
					yLabel = {yLabel}
					/>
			</div>)
	}
}
export default Graph;