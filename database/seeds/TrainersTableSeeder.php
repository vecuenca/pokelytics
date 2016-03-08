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
     DB::insert(
            'insert into trainers
            (id, name, physical_location)
            values
            (?, ?, ?) ',
            [NULL, "Json", "Vancouver"]);
    }
}
