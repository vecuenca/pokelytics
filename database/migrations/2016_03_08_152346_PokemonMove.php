<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PokemonMove extends Migration
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
            $table->integer('move')->unsigned();
            $table->foreign('move')->references('id')->on('moves');
            $table->integer('learned_at');
            // Set the composite key of this join table
            $table->primary(['pokemon', 'move']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('pokemon_moves');
    }
}
