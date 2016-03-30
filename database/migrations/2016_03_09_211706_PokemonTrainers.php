<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PokemonTrainers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pokemon_trainers', function (Blueprint $table) {
            $table->integer('pokemon')->unsigned();
            $table->foreign('pokemon')->references('id')->on('pokemons');

            $table->integer('trainer')->unsigned();
            $table->foreign('trainer')->references('id')->on('trainers');

            $table->string('name');

            $table->integer('move1')->unsigned();
            $table->foreign(['pokemon', 'move1'])->references(['pokemon', 'move'])->on('pokemon_moves');
            $table->integer('move2')->unsigned();
            $table->foreign(['pokemon', 'move2'])->references(['pokemon', 'move'])->on('pokemon_moves');
            $table->integer('move3')->unsigned();
            $table->foreign(['pokemon', 'move3'])->references(['pokemon', 'move'])->on('pokemon_moves');
            $table->integer('move4')->unsigned();
            $table->foreign(['pokemon', 'move4'])->references(['pokemon', 'move'])->on('pokemon_moves');

            // Set the composite key of this join table
            $table->primary(['pokemon', 'trainer', 'name']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('pokemon_trainers');
    }
}
