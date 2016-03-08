<?php

use Illuminate\Database\Seeder;

class MovesTableSeeder extends Seeder
{
	/**
	* Run the database seeds.
	*
	* @return void
	*/
	public function run()
	{
	$move_array = [
		[null, "Absorb", "Grass", "Special", 20, 100, 25, "User recovers half the HP inflicted on opponent."]
	];

	foreach ($move_array as list($a, $b, $c, $d, $e, $f, $g, $h))
	{
		DB::insert('insert into moves
			(id, name, type, category, power, accuracy, pp, effect)
			values
			(?, ?, ?, ?, ?, ?, ?, ?)',
			[$a, $b, $c, $d, $e, $f, $g, $h]);
		}
	}
}