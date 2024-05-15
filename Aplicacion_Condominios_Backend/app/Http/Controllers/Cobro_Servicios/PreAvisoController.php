<?php

namespace App\Http\Controllers\Cobro_Servicios;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Cobro_Servicios\PreAvisoModel;
use App\Models\Cobro_Servicios\ExpensaModel;
use App\Models\GestDepartamento\departamento;

class PreAvisoController extends Controller
{
    public function index()
    {
        $preavisos = PreAvisoModel::all();
        return response()->json([
            'status' => 200,
            'data' => $preavisos,
        ]);
    }

    public function obtenerNombresDepartamentos()
    {
        $departamentos = Departamento::pluck('nombre_departamento','id');
        return $departamentos;
    }

    public function store(Request $request)
    {
        $preaviso = new PreAvisoModel();
        $preaviso->departamento_id = $request->departamento_id;
        $preaviso->fecha = $request->fecha;
        $preaviso->propietario_pagar = $request->propietario_pagar; // Agregar punto y coma aquí
        $preaviso->descripcion_servicios = $request->descripcion_servicios;
        $preaviso->servicio_pagar = $request->servicio_pagar; // Agregar punto y coma aquí
        $preaviso->monto = $request->monto;
        $preaviso->save();
        
        return response()->json([
            'status' => 200,
            'message' => 'Pre aviso de Expensa generado existosamente',
        ]);
    }


    /*public function obtenerTodosPreAvisos()
    {
        $preAvisos = ExpensaModel::all()->toArray(); // Convertimos los resultados a un array
        return response()->json([
            'status' => 200,
            'preAvisos' => $preAvisos,
        ]);
    }*/

    public function obtenerTodosPreAvisos()
{
    $preAvisos = ExpensaModel::with('departamento:id,nombre_departamento')->get()->toArray();
    return response()->json([
        'status' => 200,
        'preAvisos' => $preAvisos,
    ]);
}
}
