<?php

namespace App\Http\Controllers\Departamento;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\departamento;

class DepartamentoCotroller extends Controller
{
    
    public function index()
    {
        $departamentos = departamento::all();
        return $departamentos;
    }
   
    public function store(Request $request)
    {
        $departamento = new departamento();
        $departamento-> nombre_departamento = $request -> nombre_departamento;
        $departamento-> numero_habitaciones = $request -> numero_habitaciones;
        $departamento-> numero_personas = $request -> numero_personas;
        $departamento-> superficie = $request -> superficie;
        $departamento-> disponibilidad = $request -> disponibilidad;
        $departamento-> amoblado = $request -> amoblado;
        $departamento-> descripcion_departamento = $request -> descripcion_departamento;
        $departamento-> piso_id = $request -> piso_id;

        $departamento->save();
    }

    public function show($id)
    {
        $departamento = departamento::find($id);
        return $departamento;
    }

    public function update(Request $request, $id)
    {
        $departamento = departamento::findOrFail($request->$id);
        $departamento-> nombre_departamento = $request -> nombre_departamento;
        $departamento-> numero_habitaciones = $request -> numero_habitaciones;
        $departamento-> numero_personas = $request -> numero_personas;
        $departamento-> superficie = $request -> superficie;
        $departamento-> disponibilidad = $request -> disponibilidad;
        $departamento-> amoblado = $request -> amoblado;
        $departamento-> descripcion_departamento = $request -> descripcion_departamento;
        $departamento-> piso_id = $request -> piso_id;

        $departamento->save();
    }

    public function destroy($id)
    {
        $departamento = departamento::destroy($id);
        return response()->json([
            'message' => 'Departameto eliminado'
            ]);        
    }
}
