<?php

namespace App\Http\Controllers\Cobro_Servicios;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Cobro_Servicios\PreAvisoModel;
use App\Models\Cobro_Servicios\ExpensaModel;
use App\Models\GestDepartamento\Departamento;

class PreAvisoController extends Controller
{
    public function obtenerNombresDepartamentos()
    {
        $departamentos = Departamento::pluck('nombre_departamento','id');
        return $departamentos;
    }
    public function store(Request $request)
    {
       /* $request->validate([
            'departamento' => 'required|string',
            'fecha' => 'required|date',
            'descripcion_servicios' => 'required|string',
            'monto' => 'required|decimal'
        ]);*/   
        $expensa = new ExpensaModel();
        $expensa->departamento = $request->departamento;
        $expensa->fecha = $request->fecha;
        $expensa->descripcion_servicios = $request->descripcion_servicios;
        $expensa->monto = $request->monto;
        $expensa->save();
        return response()->json([
            'status' => 200,
            'message' => 'Expensa generada existosamente',
        ]);
    }
}
