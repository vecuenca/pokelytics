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
	$pmoves_array = [
		[43, 71, 1]
	];

	foreach ($pmoves_array as list($a, $b, $c))
	{
		DB::insert('insert into pokemon_moves
			(pokemon, move, learned_at)
			values
			(?, ?, ?)',
			[$a, $b, $c]);
		}
	}
}