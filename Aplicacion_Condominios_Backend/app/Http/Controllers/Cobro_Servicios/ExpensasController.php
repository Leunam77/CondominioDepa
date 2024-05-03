<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Cobro_Servicios\ExpensaModel;

class ExpensasController extends Controller
{
    
    public function store(Request $request)
    {
        $preaviso = PreAvisoModel::findOrFail($request->departamento_id);

        $expensa = new ExpensaModel();

        $expensa->departamento_id = $preaviso->departamento_id;
        $expensa->fecha = $preaviso->fecha;
        $expensa->propietario_pagar = $preaviso->propietario_pagar;
        $expensa->descripcion_servicios = $preaviso->descripcion_servicios;
        $expensa->servicio_pagar = $preaviso->servicio_pagar;
        $expensa->monto = $preaviso->monto;

        $expensa->save();

        return response()->json([
            'status' => 200,
            'message' => 'Expensa generada exitosamente',
        ]);
    }
}
