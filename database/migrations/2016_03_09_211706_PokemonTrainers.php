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
