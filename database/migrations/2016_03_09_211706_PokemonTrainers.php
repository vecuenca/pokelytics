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
            $table->foreign('move1')->references('id')->on ('moves');
            $table->integer('move2')->unsigned();
            $table->foreign('move2')->references('id')->on ('moves');
            $table->integer('move3')->unsigned();
            $table->foreign('move3')->references('id')->on ('moves');
            $table->integer('move4')->unsigned();
            $table->foreign('move4')->references('id')->on ('moves');

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
