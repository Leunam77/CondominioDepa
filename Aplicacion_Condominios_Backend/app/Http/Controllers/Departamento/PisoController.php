<?php

namespace App\Http\Controllers\Departamento;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\piso;

class PisoController extends Controller
{

    public function index()
    {
        $pisos = piso::all();
        return $pisos;
    }

    public function store(Request $request)
    {
        $piso = new piso();
        $piso-> numero_piso = $request -> numero_piso;
        $piso-> edificio_id = $request -> edificio_id;

        $piso->save();
    }

    public function show($id)
    {
        $piso = piso::find($id);
        return $piso;
    }

    public function update(Request $request, $id)
    {
        $piso = piso::findOrFail($request->$id);
        $piso-> numero_piso = $request -> numero_piso;
        $piso-> edificio_id = $request -> edificio_id;

        $piso->save();
    }

    public function destroy($id)
    {
        $piso = piso::destroy($id);
        return $piso;
    }

    public function getPisosByEdificios(Request $request)
    {
        $edificioId = $request->query('edificio_id');

        // Si el bloque_id no se proporciona, retorna un mensaje de error
        if (!$edificioId) {
            return response()->json(['error' => 'El parámetro edificio_id es requerido.'], 400);
        }

        $pisos = piso::where('edificio_id', $edificioId)->get();
        return response()->json(['pisos' => $pisos]);
    }
}
