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
            [1, 1, "Vassos"]
            ];

        foreach ($ptrainer_array as list($a,$b,$c))
        {
            DB::insert(
            'insert into pokemon_trainers
            (pokemon, trainer, name)
            values
            (?, ?, ?) ',
            [$a,$b,$c]);
        }
    }
}
