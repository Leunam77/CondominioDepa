<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Departamento\BloqueController;
use App\Http\Controllers\Departamento\DepartamentoCotroller;
use App\Http\Controllers\Departamento\EdificioController;
use App\Http\Controllers\Departamento\ResidenteController;
use App\Http\Controllers\Departamento\ContratoController;

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
    Route::get('/departamentos','index')->name('departamento.index');
    Route::put('/departamentos/{id}/actualizarDisp','actualizarDisponibilidadDepa')->name('residente.actualizarDisponibilidadDepa');
    Route::post('/departamento','store')->name('departamento.store');
    Route::get('/departamento/{id}','show')->name('departamento.show');
    Route::post('/departamentoupd/{id}','update')->name('departamento.update');
    Route::delete('/departamento/{id}','destroy')->name('departamento.destroy');
    //ruta para mantenimiento
    Route::get('/departamentos-by-edificios/{id}', 'getDepartamentosByEdificios')->name('departamento.getDepartamentosByEdificios');
});

Route::controller(BloqueController::class)->group(function(){
    Route::get('/bloques','index')->name('bloque.index');
    Route::post('/bloque','store')->name('bloque.store');
    Route::get('/bloque/{id}','show')->name('bloque.show');
    Route::post('/bloqueupd/{id}','update')->name('bloque.update');
    Route::delete('/bloque/{id}','destroy')->name('bloque.destroy');
});

Route::controller(EdificioController::class)->group(function(){
    Route::get('/edificios','index')->name('edificio.index');
    Route::post('/edificio','store')->name('edificio.store');
    Route::get('/edificio/{id}','show')->name('edificio.show');
    Route::post('/edificioupd/{id}','update')->name('edificio.update');
    Route::delete('/edificio/{id}','destroy')->name('edificio.destroy');
    Route::get('/edificios-by-bloques/{id}', 'getEdificiosByBloques')->name('edificio.getEdificiosByBloques');
});
Route::controller(ResidenteController::class)->group(function(){
    Route::get('/residentes','index')->name('residente.index');
    Route::get('/residentes-disp/{estado}','getResidentesbyEstado')->name('residente.getResidentesbyEstado');
    Route::post('/residentes/actualizar-estado-contrato', 'actualizarEstadoContrato')->name('residente.actualizarEstadoContrato');
    Route::put('/residentes/{id}/actualizarEst','actualizarEstadoResidente')->name('residente.actualizarEstadoResidente');
    Route::put('/residentes/{id}/actualizarContrato','actualizarContrato')->name('residente.actualizarContrato');
    Route::post('/residente','store')->name('residente.store');
    Route::get('/residente/{id}','show')->name('residente.show');
    Route::put('/residenteupd/{id}','update')->name('residente.update');
    Route::delete('/residente/{id}','destroy')->name('residente.destroy');
    Route::post('/residente-csv','import')->name('residente.import');
    //obtener residentes de un contrato
    Route::get('/residentes-by-contrato/{id}', 'getResidentesByContrato')->name('residente.getResidentesByContrato');
    //obtener propietario de un contrato
    Route::get('/propietario-by-contrato/{id}', 'getPropietariosByContrato')->name('residente.getPropietariosByContrato');
    //obtener titulares de un contrato
    Route::get('/titular-by-contrato/{id}', 'getTitularByContrato')->name('residente.getTitularByContrato');
    //obtener titulares y propietarios para notificaciones generales
    Route::get('/notificacion-general', 'notificacionesGenerales')->name('residente.notificacionesGenerales');
    //ruta para mantenimiento
    Route::get('/residente-by-departamento/{id}', 'getResidenteByDepartamento')->name('residente.getResidenteByDepartamento');
    Route::get('/propietario-by-contratoS/{id}', 'getPropietByContratShort')->name('residente.getPropietByContratShort');
    Route::get('/titular-by-contratoS/{id}', 'getTitularByContratShort')->name('residente.getTitularByContratShort');

});
Route::controller(ContratoController::class)->group(function(){
    Route::get('/contratos','index')->name('contrato.index');
    Route::post('/contrato','store')->name('contrato.store');
    Route::get('/contrato/{id}','show')->name('contrato.show');
    Route::put('/contratoupd/{id}','update')->name('contrato.update');
    Route::delete('/contrato/{id}','destroy')->name('contrato.destroy');
    Route::get('/contratoDep/{valorDepartamento}', 'buscarContratoPorDepartamento')->name('contrato.buscarContratoPorDepartamento');
});