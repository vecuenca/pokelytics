<?php

use Illuminate\Database\Seeder;

class PokemonTrainersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $ptrainer_array = [
            [1, 1, "Bulbasaur", 13, 14, 15, 20],
            [151, 1, "Mewtwo", 1, 5, 6, 7],
            [6, 1, "Charizard", 10, 5, 7, 9],
            [51,1,"DugT",10,15,28,34],
            [59,1,"FireDog",29,34, 36, 38],
            [65,1,"Psychic Dude",5,7,8,9],

            [9, 2, "Blastoise", 5, 8, 25, 29],
            [151, 2, "Mewtwo", 6, 7, 8, 9],
            [12, 2, "Caterpie", 13, 16, 18, 36],
            [55,2,"GOLduck",5,6,25,129],
            [89,2,"MUK",1,7,8,9],
            [65,2,"Psychic Dude",5, 7, 8, 9],

            [18, 3, "Pidgeot", 13, 16, 17, 18],
            [151, 3, "Mewtwo", 6, 7,8,9],
            [26, 3, "Raichu", 5,6,9,25],
            [51,3,"Dugtrio",10,15,28,34],
            [63,3,"Abra",5,7,8,9],
            [107,3,"Dude",4,5,7,8]
            ];

        foreach ($ptrainer_array as list($a,$b,$c,$d,$e,$f,$g))
        {
            DB::insert(
            'insert into pokemon_trainers
            (pokemon, trainer, name, move1, move2, move3, move4)
            values
            (?, ?, ?, ?, ?, ?, ?) ',
            [$a,$b,$c,$d,$e,$f,$g]);
        }
    }
}
