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
    public function elimPisoComplet($idPiso){
        
        $piso = new Piso(); //es recomendable crear el objeto por buenas practicas 
        $piso ->Piso::findOrfail($idPiso);
        //eliminando los departamentos del piso
        $piso->departamentos()->delete();
    }
}
