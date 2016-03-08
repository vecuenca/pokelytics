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
        $poke_array = [
            [1,"Bulbasaur","Grass","Poison",45,49,49,65,45,45],
            [2,"Ivysaur","Grass","Poison",60,62,63,80,60,45],
            [3,"Venusaur","Grass","Poison",80,82,83,100,80,45],
            [4,"Charmander","Fire",null,39,52,43,50,65,45],
            [5,"Charmeleon","Fire",null,58,64,58,65,80,45],
            [6,"Charizard","Fire","Flying",78,84,78,85,100,45],
            [7,"Squirtle","Water",null,44,48,65,50,43,45],
            [8,"Wartortle","Water",null,59,63,80,65,58,45],
            [9,"Blastoise","Water",null,79,83,100,85,78,45],
            [10,"Caterpie","Bug",null,45,30,35,20,45,255]
            ];


        foreach ($poke_array as list($a,$b,$c,$d,$e,$f,$g,$h,$i,$j))
        {
            DB::insert(
            'insert into pokemons 
            (id, name, type_1, type_2, hp, attack, defense, special, speed, catch_rate) 
            values 
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ', 
             [$a,$b,$c,$d,$e,$f,$g,$h,$i,$j]);
        }
    }
}
