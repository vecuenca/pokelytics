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
<<<<<<< HEAD
            [1, 1, "Bulbasaur", 1, 2, 3, 4],
            [151, 1, "Mewtwo", 1, 2, 3, 4],
            [6, 1, "Charizard", 6, 21, 10, 32],
            [51,1,"DugT",8,16,21,15],
            [59,1,"FireDog",11,24,16,33],
            [65,1,"Psychic Dude",24,36,11,10],
            
            [9, 2, "Blastoise", 1, 2, 3, 4],
            [151, 2, "Mewtwo", 6, 10, 18, 33],
            [10, 2, "Caterpie", 6, 21, 10, 3],
            [55,2,"GOLduck",8,16,21,15],
            [89,2,"MUK",11,24,16,33],
            [65,2,"Psychic Dude",24,36,11,10],
            
            [18, 3, "Pidgeot", 1, 2, 3, 4],
            [151, 3, "Mewtwo", 6, 10, 18, 33],
            [26, 3, "Raichu", 6, 21, 10, 3],
            [51,3,"Dugtrio",8,16,21,15],
            [63,3,"Abra",11,24,16,33],
            [107,3,"Dude",24,36,11,10]
            ];
=======
            [1, 1, "Vassos", 13, 14, 15, 20]
        ];
>>>>>>> origin/master

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
