<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use DB;

class PokemonController extends Controller
{
    /**
     * Grab all Pokemon
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pokemon = DB::select('select * from pokemons');
        return json_encode($pokemon);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $pokemon = DB::select('select * from pokemons where id = :id', ['id'=>$id]);
        return json_encode($pokemon);
    }

    public function showByType($type_1, $type_2 = null)
    {
        $where = "select * from pokemons where";

        $where . "type_1 = " . $type_1;
        if ($type_2)
            $where . "and type_2 = " . $type_2;

        return json_encode($pokemon);
    }
}
