<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Departamento\BloqueController;
use App\Http\Controllers\Departamento\DepartamentoCotroller;
use App\Http\Controllers\Departamento\EdificioController;
use App\Http\Controllers\Departamento\PisoController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(DepartamentoCotroller::class)->group(function(){
    Route::get('/departamentos','index')->name('departamentos.index');
    Route::post('/departamento','store')->name('departamento.store');
    Route::get('/departamento/{id}','show')->name('departamento.show');
    Route::put('/departamento/{id}','update')->name('departamento.update');
    Route::put('/departamento/{id}','destroy')->name('departamento.destroy');
});

Route::controller(BloqueController::class)->group(function(){
    Route::get('/bloques','index')->name('bloques.index');
    Route::post('/bloque','store')->name('bloque.store');
    Route::get('/bloque/{id}','show')->name('bloque.show');
    Route::put('/bloque/{id}','update')->name('bloque.update');
    Route::put('/bloque/{id}','destroy')->name('bloque.destroy');
});

Route::controller(EdificioController::class)->group(function(){
    Route::get('/edificios','index')->name('edificios.index');
    Route::post('/edificio','store')->name('edificio.store');
    Route::get('/edificio/{id}','show')->name('edificio.show');
    Route::put('/edificio/{id}','update')->name('edificio.update');
    Route::put('/edificio/{id}','destroy')->name('edificio.destroy');
});

Route::controller(PisoController::class)->group(function(){
    Route::get('/pisos','index')->name('pisos.index');
    Route::post('/piso','store')->name('piso.store');
    Route::get('/piso/{id}','show')->name('piso.show');
    Route::put('/piso/{id}','update')->name('piso.update');
    Route::put('/piso/{id}','destroy')->name('piso.destroy');
});