<?php

namespace App\Http\Controllers\Departamento;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\edificio;

class EdificioController extends Controller
{

    public function index()
    {
        $edificios = edificio::all();
        return $edificios;
    }

    public function store(Request $request)
    {
        $edificio = new edificio();
        $edificio-> nombre_edificio = $request -> nombre_edificio;
        $edificio-> descripcion_edificio = $request -> descripcion_edificio;
        $edificio-> bloque_id = $request -> bloque_id;

        $edificio->save();
    }

    public function show($id)
    {
        $edificio = edificio::find($id);
        return $edificio;
    }

    public function update(Request $request, $id)
    {
        $edificio = edificio::findOrFail($request->$id);
        $edificio-> nombre_edificio = $request -> nombre_edificio;
        $edificio-> descripcion_edificio = $request -> descripcion_edificio;
        $edificio-> bloque_id = $request -> bloque_id;

        $edificio->save();
    }

    public function destroy($id)
    {
        $edificio = edificio::destroy($id);
        return $edificio;
    }
}
