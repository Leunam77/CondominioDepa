<?php

namespace App\Http\Controllers\Cobro_Servicios;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Cobro_Servicios\PreAvisoModel;
use App\Models\GestDepartamento\Departamento;
use App\Http\Controllers\Cobro_Servicios\ExpensasController;


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
        $departamentos = Departamento::pluck('nombre_departamento', 'id');
        return $departamentos;
    }

    public function store(Request $request)
    {
        $request->validate([
            'departamento_id' => 'required|exists:departamentos,id',
            'fecha' => 'required|date',
            'descripcion_servicios' => 'required|string',
            'servicio_pagar' => 'required|string',
            'monto' => 'required|numeric',
        ]);
        $departamento = Departamento::findOrFail($request->departamento_id);
        $nombre_residente = $departamento->contrato ? ($departamento->contrato->residente ? $departamento->contrato->residente->nombre_residente : null) : null;

        $preaviso = new PreAvisoModel();
        $preaviso->departamento_id = $request->departamento_id;
        $preaviso->fecha = $request->fecha;
        $preaviso->propietario_pagar = $nombre_residente;
        $preaviso->descripcion_servicios = $request->descripcion_servicios;
        $preaviso->servicio_pagar = $request->servicio_pagar;
        $preaviso->monto = $request->monto;
        $preaviso->save();
        return response()->json([
            'status' => 200,
            'message' => 'Preaviso generado exitosamente',
        ]);
    }
    
    // Método para obtener un preaviso por su ID
    public function show($id)
    {
        $preaviso = PreAvisoModel::findOrFail($id);
        return response()->json([
            'status' => 200,
            'data' => $preaviso,
        ]);
    }

    public function update(Request $request, $id)
    {
        
        $request->validate([
            'fecha' => 'required|date',
            'descripcion_servicios' => 'required|string',
            'servicio_pagar' => 'required|string',
            'monto' => 'required|numeric',
        ]);
    

        $preaviso = PreAvisoModel::findOrFail($id);
    

        $preaviso->fecha = $request->fecha;
        $preaviso->descripcion_servicios = $request->descripcion_servicios;
        $preaviso->servicio_pagar = $request->servicio_pagar;
        $preaviso->monto = $request->monto;
    
        $preaviso->save();
        return response()->json([
            'status' => 200,
            'message' => 'Preaviso actualizado exitosamente',
        ]);
    }

    public function destroy($id)
    {
        $preaviso = PreAvisoModel::findOrFail($id);
        $preaviso->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Preaviso eliminado exitosamente',
        ]);
    }
}
