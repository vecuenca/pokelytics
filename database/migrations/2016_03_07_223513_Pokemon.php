<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Pokemon extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pokemons', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('type_1');
            $table->string('type_2')->nullable();
            $table->double('hp', 15, 8);
            $table->double('attack', 15, 8);
            $table->double('defense', 15, 8);
            $table->double('special_attack', 15, 8);
            $table->double('special_defense', 15, 8);
            $table->double('catch_rate', 15, 8);
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('pokemons');
    }
}
