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

    public function put(Request $r) {
        if ($r->has('query')) {
            try {
                $result = DB::select($r->get('query'));
            } catch (\PDOException $e) {
                return $e->getMessage();
            }
            $keys = array_keys((array) $result[0]);
            return json_encode(array_merge(array($keys), $result));
        }
    }
}
