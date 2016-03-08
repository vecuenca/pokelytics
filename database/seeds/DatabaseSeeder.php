<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
    	$this->call(LocationsTableSeeder::class);
    	$this->call(PokemonsTableSeeder::class);
        $this->call(TrainersTableSeeder::class);
        $this->call(MovesTableSeeder::class);
        $this->call(PokemonMovesTableSeeder::class);
        $this->call(PokemonLocationsTableSeeder::class);
    }
}
