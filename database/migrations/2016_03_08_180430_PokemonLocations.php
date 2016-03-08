<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PokemonLocations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pokemon_moves', function (Blueprint $table) {
            $table->integer('pokemon')->unsigned();
            $table->foreign('pokemon')->references('id')->on('pokemons');
            $table->integer('location')->unsigned();
            $table->foreign('location')->references('id')->on('locations');
locations});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('pokemon_locations');
    }
}
