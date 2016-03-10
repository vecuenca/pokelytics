<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::resource('pokemon',
	'PokemonController', ['only' => ['index', 'show']]);

Route::get('pokemon', 'PokemonController@index');
Route::get('pokemon/id/{id}', 'PokemonController@show');
Route::get('pokemon/{type_1?}/{type_2?}','PokemonController@show'));

Route::get('trainer/{id}', 'TrainerController@show');


/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['middleware' => ['web']], function () {
    //
});
