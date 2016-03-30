<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PokemonTrainerTrigger extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared("
            CREATE TRIGGER tr_POKEMON_TRAINER AFTER INSERT ON `pokemon_trainers` FOR EACH ROW
            BEGIN
                IF NEW.move1 = NEW.move2 OR NEW.move1 = NEW.move3 OR NEW.move1 = NEW.move4 OR
                    NEW.move2 = NEW.move3 OR NEW.move2 = NEW.move4 OR NEW.move3 = NEW.move4 THEN
                    SIGNAL SQLSTATE '45000'
                    SET MESSAGE_TEXT = 'Move inserted must be unique';
                END IF;
            END;
        ");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
