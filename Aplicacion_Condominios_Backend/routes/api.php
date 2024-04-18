<?php

use App\Http\Controllers\CommonArea\CommonAreaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Departamento\BloqueController;
use App\Http\Controllers\Departamento\DepartamentoCotroller;
use App\Http\Controllers\Departamento\EdificioController;
use App\Http\Controllers\Empleados\EmployeeController;
use App\Http\Controllers\Mantenimiento\CategoriaServicioController;
use App\Http\Controllers\Cobro_Servicios\EquipamientosController;
use App\Http\Controllers\Cobro_Servicios\PreAvisoController;
use App\Models\Mantenimiento\CategoriaServicio;
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
    Route::post('/departamento','store')->name('departamento.store');
    Route::get('/departamento/{id}','show')->name('departamento.show');
    Route::put('/departamento/{id}','update')->name('departamento.update');
    Route::delete('/departamento/{id}','destroy')->name('departamento.destroy');
});

Route::controller(BloqueController::class)->group(function(){
    Route::get('/bloques','index')->name('bloque.index');
    Route::post('/bloque','store')->name('bloque.store');
    Route::get('/bloque/{id}','show')->name('bloque.show');
    Route::put('/bloque/{id}','update')->name('bloque.update');
    Route::delete('/bloque/{id}','destroy')->name('bloque.destroy');
});

Route::controller(EdificioController::class)->group(function(){
    Route::get('/edificios','index')->name('edificio.index');
    Route::post('/edificio','store')->name('edificio.store');
    Route::get('/edificio/{id}','show')->name('edificio.show');
    Route::put('/edificio/{id}','update')->name('edificio.update');
    Route::delete('/edificio/{id}','destroy')->name('edificio.destroy');
    Route::get('/edificios-by-bloques/{id}', 'getEdificiosByBloques')->name('edificios.bybloques');
});

Route::post('/add_employee', [EmployeeController::class, 'store']);
Route::get('/get_all_employees', [EmployeeController::class, 'getAll']);
Route::delete('/delete_employee/{id}', [EmployeeController::class, 'delete']);
Route::get('/get_employee/{id}', [EmployeeController::class, 'getById']);
Route::post('/update_employee/{id}', [EmployeeController::class, 'update']);

// MANTENIMIENTO
Route::get('/CategoriaServicio', [CategoriaServicioController::class,'getCategoriaServicio']);
Route::get('/CategoriaServicio/{id}', [CategoriaServicioController::class,'getCategoriaId']);
Route::post('/CategoriaServicio/insert', [CategoriaServicioController::class,'insertarCategoria']);
Route::put('/CategoriaServicio/update/{id}', [CategoriaServicioController::class,'updateCategoria']);
Route::delete('/CategoriaServicio/delete/{id}', [CategoriaServicioController::class,'deleteCategoria']);

Route::apiResource('/areas-comunes', CommonAreaController::class);


//Cobro_Servicios
Route::controller(EquipamientosController::class)->group(function(){
    Route::post('/agregarEquipo', [EquipamientosController::class, 'store']);
});

Route::controller(PreAvisoController::class)->group(function(){
    Route::get('/obtener-departamentos', [PreAvisoController::class, 'obtenerNombresDepartamentos']);
    Route::post('/generar-preaviso', [PreAvisoController::class, 'store']);
});



