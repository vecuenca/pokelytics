<?php

use Illuminate\Database\Seeder;

class PokemonMovesTableSeeder extends Seeder
{
	/**
	* Run the database seeds.
	*
	* @return void
	*/
	public function run()
	{
	$plocs_array = [
		[43, 71, 1]
	];

	foreach ($pmoves_array as list($a, $b))
	{
		DB::insert('insert into pokemon_locations
			(pokemon, location)
			values
			(?, ?)',
			[$a, $b]);
		}
	}
}