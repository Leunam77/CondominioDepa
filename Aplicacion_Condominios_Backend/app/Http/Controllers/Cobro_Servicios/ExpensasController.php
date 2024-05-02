<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Cobro_Servicios\ExpensaModel;

class ExpensasController extends Controller
{
    
    public function store(Request $request)
    {
        $expensa = new ExpensaModel();
        $expensa->preaviso_id = $request->departamento_id; // Aquí cambiamos 'departamento_id' por 'preaviso_id'
        $expensa->fecha = $request->fecha;
        $expensa->propietario_pagar = $request->propietario_pagar;
        $expensa->descripcion_servicios = $request->descripcion_servicios;
        $expensa->servicio_pagar = $request->servicio_pagar;
        $expensa->monto = $request->monto;
        $expensa->save();

        return response()->json([
            'status' => 200,
            'message' => 'Expensa generada existosamente',
        ]);
    }
}
