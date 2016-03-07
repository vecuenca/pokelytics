<?php

use Illuminate\Database\Seeder;

class PokemonsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
     DB::insert(
            'insert into pokemons 
            (id, name, type_1, type_2, hp, attack, defense, special_attack, special_defense,
            catch_rate) 
            values 
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ', 
            [25, "Pikachu", "Electric", null, 35, 55, 30, 50, 40, 90]);
    }
}
