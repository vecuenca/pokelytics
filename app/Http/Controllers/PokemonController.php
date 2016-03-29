<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use DB;

class PokemonController extends Controller
{
    public function query(Request $r) {
        if ($r->has('query')) {
            try {
                $result = DB::select($r->get('query'));
                if (empty($result)) {
                    return "Successfully executed query";
                }
            } catch (\PDOException $e) {
                return $e->getMessage();
            }
            $keys = array_keys((array) $result[0]);
            return json_encode(array_merge(array($keys), $result));
        }
    }
}
