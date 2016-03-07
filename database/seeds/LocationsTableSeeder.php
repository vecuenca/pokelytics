<?php

use Illuminate\Database\Seeder;

class LocationsTableSeeder extends Seeder
{
	/**
	* Run the database seeds.
	*
	* @return void
	*/
	public function run()
	{
	DB::insert('insert into locations (id, name, region, music_played) values (?, ?, ?, ?)', 
		[1, "PalletTown", "Kanto", "Fart"]);
	}
}