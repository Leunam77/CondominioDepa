<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Departamento\BloqueController;
use App\Http\Controllers\Departamento\DepartamentoCotroller;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


//path para bloque
Route::get('/bloque/all',BloqueController::class.'@index')->name('bloque.index');
Route::get('/bloque/create',BloqueController::class.'@create')->name('bloque.create');
Route::post('/bloque/store',BloqueController::class.'@store')->name('bloque.store');
Route::get('/bloque/edit/{id}',BloqueController::class.'@edit')->name('bloque.edit');
Route::put('/bloque/update/{id}',BloqueController::class.'@update')->name('bloque.update');
Route::delete('/bloque/delete/{id}',BloqueController::class.'@destroy')->name('bloque.destroy');

//path de departamento (debemos corregir el nombre Esta mal escrito)
Route::get('/departamento/all',DepartamentoCotroller::class.'@index')->name('departamento.index');
Route::get('/departamento/create',DepartamentoCotroller::class.'@create')->name('departamento.create');
Route::get('/departamento/show/{id}',DepartamentoCotroller::class.'@show')->name('departamento.show');
Route::post('/departamento/store',DepartamentoCotroller::class.'@store')->name('departamento.store');
Route::get('/departamento/edit/{id}',DepartamentoCotroller::class.'@edit')->name('departamento.edit');
Route::put('/departamento/update/{id}',DepartamentoCotroller::class.'@update')->name('departamento.update');
Route::delete('/bloque/delete/{id}',DepartamentoCotroller::class.'@delete')->name('departamento.delete');