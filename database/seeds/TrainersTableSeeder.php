<?php

use Illuminate\Database\Seeder;

class TrainersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $trainer_array = 
        [
        [1,"Brandon","Toronto"],
        [2,"Vincent","Toronto"],
        [3,"Quas","San Diego"]
        ];

    foreach ($trainer_array as list($a, $b,$c))
    {
     DB::insert(
            'insert into trainers
            (id, name, physical_location)
            values
            (?, ?, ?) ',
            [$a, $b, $c]);
    }

    }
}
