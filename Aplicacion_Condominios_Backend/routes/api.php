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
    Route::get('/departamentos','index');
    Route::post('/departamento','store');
    Route::get('/departamento/{id}','show');
    Route::put('/departamento/{id}','update');
    Route::put('/departamento/{id}','destroy');
});

Route::controller(BloqueController::class)->group(function(){
    Route::get('/bloques','index');
    Route::post('/bloque','store');
    Route::get('/bloque/{id}','show');
    Route::put('/bloque/{id}','update');
    Route::put('/bloque/{id}','destroy');
});

Route::controller(EdificioController::class)->group(function(){
    Route::get('/edificios','index');
    Route::post('/edificio','store');
    Route::get('/edificio/{id}','show');
    Route::put('/edificio/{id}','update');
    Route::put('/edificio/{id}','destroy');
});

Route::controller(PisoController::class)->group(function(){
    Route::get('/pisos','index');
    Route::post('/piso','store');
    Route::get('/piso/{id}','show');
    Route::put('/piso/{id}','update');
    Route::put('/piso/{id}','destroy');
});