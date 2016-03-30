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
            [1, 1, "Vassos", 13, 14, 15, 20]
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
